pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm install'
                sh 'npm run test:e2e'  // Exécute vos tests Playwright
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the project...'
            }
        }
    }
    post {
        always {
            echo 'Pipeline complete!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
