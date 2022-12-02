pipeline {
  agent any
  environment {
    DOCKERHUB_CREDENTIALS=credentials('dockerhub')
  }

  stages {
    stage('Git Checkout') {
      steps {
        git(url: 'https://github.com/fernandocorrea256/quick-start-kafkajs', branch: 'master')
      }
    }

    stage('npm') {
      steps {
        sh '''#!/bin/bash
npm --prefix ./consumer install ./consumer
npm --prefix ./producer install ./producer
npm --prefix ./consumer run test
npm --prefix ./producer run test'''
      }
    }

    stage('docker build') {
      steps {
        sh '''#!/bin/bash
docker-compose build'''
      }
    }

    stage('docker login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }

    stage('docker push') {
      steps {
        sh '''docker push daniel512/kafka-producer
docker push daniel512/kafka-consumer'''
      }
    }
  }

  post {
    always {
      sh 'docker logout'
    }
  }
}