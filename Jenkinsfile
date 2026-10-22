pipeline {
    agent any

    environment {
        // CHANGE THIS to your Docker Hub username
        IMAGE = 'varun5670/textile-sales-manager'
        TAG   = "v${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            steps {
                sh 'docker run --rm -v "$PWD":/app -w /app node:20-alpine npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build --build-arg APP_VERSION=$TAG -t $IMAGE:$TAG .'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo "$PASS" | docker login -u "$USER" --password-stdin'
                    sh 'docker push $IMAGE:$TAG'
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                // Put the new image tag into the deployment file, then apply it
                sh 'sed -i "s|image: .*|image: $IMAGE:$TAG|" k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/'
                sh 'kubectl rollout status deployment/textile-sales-manager'
            }
        }

        stage('Verify') {
            steps {
                sh 'kubectl get pods,deployment,service'
            }
        }
    }
}
