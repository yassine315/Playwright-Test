import { test, expect } from '@playwright/test';
import { HotelPage } from '../src/pages/hotelPage';

test.describe('Hotel page navigation visibility', () => {
  let hotelPage: HotelPage;

  test.beforeEach(async ({ page }) => {
    hotelPage = new HotelPage(page);
    await hotelPage.visit();
  });

  test('Navigation hidden when scrolling down', async () => {
    await hotelPage.scrollDown();
    await hotelPage.navigationNotVisible();
  });

  test('Navigation visible when scrolling up', async () => {
    await hotelPage.scrollDown(); 
    await hotelPage.scrollUp();    
    await hotelPage.navigationVisible();
  });
});
