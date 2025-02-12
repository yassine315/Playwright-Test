const { test, expect } = require('@playwright/test');

test('Test de réservation sur ibis.accor.com', async ({ page }) => {
  // Aller sur le site
  await page.goto('https://ibis.accor.com/en.html');

  await page.waitForSelector('#onetrust-accept-btn-handler', { timeout: 10000 });

  // Cliquer sur le bouton "Accept all"
  await page.click('#onetrust-accept-btn-handler');
  console.log('Cookies acceptés.');

  // Attendre que la boîte modale apparaisse
  await page.waitForSelector('span.modal-closeIcon', { timeout: 5000 });

  // Cliquer sur le bouton "X" pour fermer la boîte modale
  await page.click('span.modal-closeIcon');
  console.log('Boîte modale fermée.');

  for (const char of 'Paris ') {
    await page.type('input[name="search.destination.userlang"]', char);
    await page.waitForTimeout(100); // Petite pause pour chaque frappe
  }
  // await page.press('input[name="search.destination.userlang"]', 'Enter');
  console.log("Destination sélectionnée : Paris");

  // Attendre que la liste de suggestions soit visible
  await page.waitForSelector('ul#destinationSuggest', { timeout: 5000 });

  // Sélectionner la première suggestion de la liste
  await page.click('ul#destinationSuggest li:first-child');
  console.log("Première suggestion sélectionnée.");

   // Cliquer sur le champ de la date pour ouvrir le calendrier
   await page.click('input.ads-date-picker__input-start');

   // Attendre que le calendrier soit visible
   await page.waitForSelector('.dp__calendar', { timeout: 5000 });
 
   // Sélectionner la date de fin du mois (28 ou 29 février)
   const firstDay = page.locator('div[data-test="Thu Feb 27 2025 00:00:00 GMT+0000 (GMT)"]'); // Date spécifique
   await firstDay.nth(0).click();
   const lastDay = page.locator('div[data-test="Fri Feb 28 2025 00:00:00 GMT+0000 (GMT)"]'); // Date spécifique
   await lastDay.nth(0).click();;


  // Cliquer sur le bouton "Rechercher"
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click('button[aria-label="Search for a destination or hotel name"]');
  
  // Attendre que la navigation/redirection soit complète
  await page.waitForNavigation({ timeout: 10000 });
  console.log("Redirection terminée.");

  // Scroll jusqu'en bas de la page progressivement pour charger toutes les chambres
let previousHeight = await page.evaluate(() => document.body.scrollHeight);
while (true) {
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.waitForTimeout(2000); // Attendre que la page charge les nouvelles sections
  
  const newHeight = await page.evaluate(() => document.body.scrollHeight);
  if (newHeight === previousHeight) break; // Arrêter le scroll si la hauteur ne change plus
  previousHeight = newHeight;
}

console.log('Fin du défilement, toutes les chambres devraient être visibles.');

// Compter le nombre total de chambres
const chooseRoomButtons = page.locator('ul.rooms-list button.room-info__button');
  const buttonsCount = await chooseRoomButtons.count();
  console.log(`Nombre de boutons "Choose this room" trouvés : ${buttonsCount}`);

});
