pipeline {
    agent any
    environment {
        scannerHome = tool 'SonarScanner'
        // DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    stages {
        stage('Check connect') {
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
        // stage('Build and push image to dockerhub') {
        //     steps {
        //         timeout(time: 5, unit: 'MINUTES') {
        //             sh 'docker compose build'
        //             sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        //             sh 'docker compose push'
        //         }
        //     }
        // }
        // stage('Deploy on ec2') {
        //     steps {
        //         withCredentials([file(credentialsId: 'ssh_key', variable: 'SSH_KEY')]) {
        //             sh '''
        //             ssh -tt -i $SSH_KEY -o StrictHostKeyChecking=no ubuntu@18.163.214.219 \
        //             "docker compose down --volumes && \
        //             docker compose pull && \
        //             echo 'Y' | docker images prune && \
        //             docker compose up -d && \
        //             exit"
        //             '''
        //         }
        //     }
        // }
    }
    // post {
    //     always {
    //         sh 'docker logout'
    //         sh 'echo "Y" | docker image prune'
    //         echo 'Enter http://18.163.214.219 to check deploy!!'
    //     }
    // }
}
