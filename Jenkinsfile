pipeline {
    agent any

    tools {
        sonarScanner 'sonarscanner'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/pramadani/Vuln_Ambamovie'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('sonarserver') {
                        sh "${tool('sonarscanner')}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    // Menunggu hasil analisis quality gate dari SonarQube
                    timeout(time: 5, unit: 'MINUTES') { // Waktu tunggu maksimal 5 menit
                        def qualityGate = waitForQualityGate()
                        if (qualityGate.status != 'OK') {
                            error "Pipeline failed due to SonarQube quality gate status: ${qualityGate.status}"
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
