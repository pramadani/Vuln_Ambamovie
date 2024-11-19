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
                    try {
                        sh """
                            docker run --user root -v ${WORKSPACE}:/zap/wrk/:rw -t zaproxy/zap-stable zap-full-scan.py -t $target -r /zap/wrk/report.html
                        """
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        echo "ZAP scan failed: ${e.getMessage()}"
                    }

                    // Menambahkan perintah chown untuk mengubah kepemilikan file laporan
                    sh """
                        sudo chown -R jenkins:jenkins ${WORKSPACE}/report.html
                    """
                }
            }
        }

        stage('Display Report') {
            steps {
                script {
                    def reportPath = "${WORKSPACE}/report.html"

                    // Cek apakah file laporan ada
                    if (fileExists(reportPath)) {
                        echo "Displaying report: ${reportPath}"

                        try {
                            // Tampilkan laporan dengan menggunakan HTML Publisher Plugin
                            publishHTML([reportFiles: 'report.html', reportName: 'OWASP ZAP Report', reportDir: "${WORKSPACE}"])
                        } catch (Exception e) {
                            // Jika ada error saat mempublish laporan, cetak pesan error
                            echo "Error while displaying the report: ${e.getMessage()}"
                            currentBuild.result = 'FAILURE'
                        }
                    } else {
                        // Jika file laporan tidak ditemukan
                        echo "Report file not found at: ${reportPath}"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}
