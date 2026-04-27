pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'rambaranwal/jenkins_devops'
        DOCKER_TAG = 'latest'
        CONTAINER_NAME = 'jenkins_devops_container'
        PORT = '8080'
    }

    stages {
        stage('clone code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/RamBaranwal/jenkinsDevops.git'
            }
        }

        stage('install dependencies'){
            steps{
                sh 'npm install'
            }
        }

        stage('Run tests case') {
            steps{
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Push Docker Image') {
            steps{
                withCredntials([usernamePassword(credentialsid: 'dockerhub',
                usernameVariable: 'DOCKER_USERNAME',
                passwordVariable: 'DOCKER_PASSWORD'
                )])
                {
                    sh "
                    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                    docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                    "
                }
            }
        }

        stage('stop old container'){
            steps{
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
            }
        }

        stage('Run Docker Container'){
            steps{
                sh "docker run -d -p ${PORT}:8080 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }

        post{
            success{
                echo 'Pipeline completed successfully.'
            }
            failure{
                echo 'Pipeline is not successfully deployed please check.'
            }
        }
    }
}