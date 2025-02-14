pipeline {
  agent any
  tools {
    nodejs 'NodeJS_23'  // Nom de l'installation Node.js configurée dans "Global Tool Configuration"
  }
  environment {
    CI = 'true'  // Assure que Playwright sait qu'il est exécuté en mode CI
  }
  stages {
    stage('Install dependencies') {
      steps {
        echo 'Installing dependencies...'
        sh 'npm ci'  // Utilisation de npm ci pour une installation rapide et fiable
      }
    }

    stage('Run Playwright Tests') {
      steps {
        echo 'Running Playwright tests...'
        sh 'npx playwright test --reporter=html --output=./test-results'  // Exécute les tests Playwright
      }
    }

    stage('Generate Playwright Report') {
      steps {
        echo 'Generating Playwright report...'
        sh 'npx playwright show-report ./test-results'  // Affiche le rapport généré par Playwright
      }
    }
  }
  post {
    always {
      echo 'Cleaning up workspace...'
      cleanWs()  // Nettoie l'espace de travail après la fin du pipeline
    }
    success {
      echo 'Build succeeded!'
    }
    failure {
      echo 'Build failed!'
      archiveArtifacts artifacts: '**/playwright-report/**', allowEmptyArchive: true  // Archive les rapports en cas d'échec
    }
  }
}
