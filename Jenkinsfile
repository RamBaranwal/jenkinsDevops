pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'rambaranwal/jenkins_devops'
        DOCKER_TAG = 'latest'
        CONTAINER_NAME = 'jenkins_devops_container'
        PORT = '8080'
    }

    stages {
        stage('clone code'){
            steps{
                git branch: 'main',
                url
            }
        }
    }
}