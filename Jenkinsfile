pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    environment {
        DOCKER_IMAGE = 'rambaranwal/jenkins_devops'
        DOCKER_TAG = 'latest'
        CONTAINER_NAME = 'jenkins_devops_container'
        PORT = '3000'
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/RamBaranwal/jenkinsDevops.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                node -v
                npm -v
                npm cache clean --force
                npm install
                '''
            }
        }

        stage('Run Test Cases') {
            steps {
                sh 'npm test'
            }
        }

        stage('Check Docker Daemon') {
            steps {
                sh '''
                echo "--- Docker version ---"
                docker --version || { echo "ERROR: docker binary not found or not in PATH"; exit 1; }
                echo "--- Docker info ---"
                docker info || { echo "ERROR: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?"; exit 1; }
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh """
                    echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                    docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                sh """
                docker rm -f ${CONTAINER_NAME} || true
                """
            }
        }

        stage('Run New Container') {
            steps {
                sh """
                docker run -d \
                --name ${CONTAINER_NAME} \
                -p ${PORT}:8080 \
                ${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker ps'
            }
        }
        }

        post {
        success {
        echo 'Pipeline executed successfully 🚀'
        }

        failure {
        echo 'Pipeline failed ❌ Check logs'
        }

        always {
        echo 'Pipeline finished'
        }
    }
}