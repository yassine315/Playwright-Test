pipeline {
  agent any
  tools {
    nodejs 'NodeJS_23'
  }
  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        sh 'npx playwright test --reporter=html --output=./test-results'
      }
    }

    stage('Archive Playwright Report') {
      steps {
        echo 'Archiving Playwright report...'
        archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: false
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}
