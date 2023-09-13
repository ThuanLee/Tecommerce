pipeline {
    agent any
    environment {
        scannerHome = tool 'SonarQube Scanner 5.0'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    stages {
        stage('Check config') {
            steps {
                echo 'Starting...'
            }
        }
        // stage('SonarQube anlysis') {
        //     steps {
        //         withSonarQubeEnv('Sonarqube') {
        //             sh "${scannerHome}/bin/sonar-scanner \
        //             -Dsonar.projectKey=develop \
        //             -Dsonar.inclusions=*,frontend/src/**,backend/**"
        //         }
        //     }
        // }
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