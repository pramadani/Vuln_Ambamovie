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

        stage('Build') {
            steps {
                script {
                    sh '''
                    docker compose build
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '''
                    docker compose down
                    docker compose up -d
                    '''
                }
            }
        }

        stage('OWASP ZAP Security Scan') {
            steps {
                script {
                    def target = 'https://ambamovie.pramadani.com'

                    sh """
                        docker run -v ${PWD}:/zap/wrk/:rw -t zaproxy/zap-stable zap-full-scan.py -t $target -r /zap/wrk/report.html
                    """
                }
            }
        }

        stage('Display Report') {
            steps {
                script {
                    if (fileExists("${WORKSPACE}/report.html")) {
                        publishHTML(target: [
                            reportName: 'OWASP ZAP Security Report',
                            reportDir: '.',
                            reportFiles: 'report.html',
                            alwaysLinkToLastBuild: true
                        ])
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
