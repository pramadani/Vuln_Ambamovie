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
                script {
                    def scannerHome = tool 'sonarscanner';
                    withSonarQubeEnv('sonarserver') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    def qualityGate = waitForQualityGate()
                    if (qualityGate.status != 'OK') {
                        error "Pipeline failed due to SonarQube quality gate status: ${qualityGate.status}"
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
