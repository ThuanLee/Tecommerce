pipeline {
    agent any
    environment {
        scannerHome = tool 'SonarScanner'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    stages {
        stage('Check config') {
            steps {
                echo 'Starting...'
            }
        }
        stage('Sonar anlysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    sh "${scannerHome}/bin/sonar-scanner \
                    -Dsonar.projectKey=thuanlee215_tecommerce \
                    -Dsonar.organization=thuanlee215 \
                    -Dsonar.inclusions=*,frontend/src/**,backend/** "
                }
            }
        }
        stage('Build and push image to dockerhub') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    sh 'docker compose build'
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    sh 'docker compose push'
                }
            }
        }
    }
    post {
        always {
            sh 'docker logout'
            echo 'Complete, Good bye!!'
        }
    }
}