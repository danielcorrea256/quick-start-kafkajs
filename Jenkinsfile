pipeline {
  agent any
  stages {
    stage('Git Checkout') {
      steps {
        git(url: 'https://github.com/fernandocorrea256/quick-start-kafkajs', branch: 'master')
      }
    }

    stage('pwd') {
      steps {
        sh 'sh \'pwd\''
      }
    }

  }
}