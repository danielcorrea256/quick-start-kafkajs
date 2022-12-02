pipeline {
  agent any
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

  }
}