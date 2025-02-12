pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
            script {
                def nodejs = tool name: 'NodeJS 16'  // Le nom défini dans la configuration de NodeJS Plugin
                env.PATH = "${nodejs}/bin:${env.PATH}"
            }
            sh 'node -v'    // Vérifie que Node.js est installé
            sh 'npm -v'
            sh 'npm install'
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
