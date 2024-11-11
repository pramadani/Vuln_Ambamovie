pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/pramadani/Vuln_Ambamovie'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                def scannerHome = tool 'sonarscanner';
                withSonarQubeEnv("sonarserver") {
                    sh '''
                    ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=Vuln_Ambamovie \
                        -Dsonar.host.url=$SONAR_HOST_URL \
                        -Dsonar.sources=. \
                        -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline stopped due to Quality Gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    try {
                        sh '''
                        docker compose down
                        docker compose build
                        docker compose up -d
                        '''
                    } catch (Exception e) {
                        error "Deployment failed: ${e.message}"
                    }
                }
            }
        }
    }
}
