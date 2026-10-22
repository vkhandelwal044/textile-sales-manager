# Textile Sales Manager: CI/CD Pipeline

## 1. The project
**Textile Sales Manager** is my existing academic project, a sales-record web app for a textile shop. It lets you create bills with categories, view sales history and reports, and print a cash memo. The app is a single web page (`index.html`) and saves data in the browser.

## 2. What the pipeline does
```
GitHub ──> Jenkins (AWS EC2) ──> Test ──> Docker image ──> Docker Hub ──> Minikube ──> Browser
```
Every time code is pushed to GitHub, Jenkins automatically tests the app, builds a new Docker image, uploads it to Docker Hub and deploys it on Kubernetes (Minikube).

## 3. Files
| File | Purpose |
|---|---|
| `index.html` | The application |
| `tests/validate.test.js` | 5 simple checks run in the test stage |
| `Dockerfile` | Packs the app into an Nginx web-server image |
| `Jenkinsfile` | The pipeline stages |
| `k8s/deployment.yaml` | Runs 2 copies (pods) of the app |
| `k8s/service.yaml` | Makes the app reachable on port 30080 |

## 4. Pipeline stages
| Stage | What happens |
|---|---|
| Checkout | Jenkins downloads the latest code from GitHub |
| Build & Test | Runs `npm test`: 5 checks (page title, no JavaScript errors, header present, saving works, print note present). The app is plain HTML, so there is nothing to compile. |
| Docker Build | Builds the image and tags it with the build number (`v1`, `v2`, …) |
| Push Image | Logs in to Docker Hub with credentials stored in Jenkins and uploads the image |
| Deploy to Minikube | Writes the new image tag into `deployment.yaml`, applies the k8s files and waits until the new pods are running |
| Verify | Lists the running pods, deployment and service |

## 5. How Jenkins was set up on AWS
- EC2 instance: Ubuntu 24.04, t3.medium, ports 22, 8080 (Jenkins) and 8081 (app) open.
- Installed Java, Jenkins, Docker, kubectl and Minikube. Minikube was started as the `jenkins` user.
- Jenkins plugins: suggested plugins + Docker Pipeline.
- Docker Hub token saved in Jenkins as the credential `dockerhub-creds`.
- Pipeline job: "Pipeline script from SCM" pointing to this repo, with Poll SCM (`H/2 * * * *`) so a push starts a build.

## 6. How the image was pushed
The Push stage reads the Docker Hub username and token from the `dockerhub-creds` credential, logs in, and pushes `your-dockerhub-username/textile-sales-manager:v<build number>`.

## 7. How the app was deployed and opened
`kubectl apply -f k8s/` creates the Deployment (2 pods) and the NodePort Service. The app is opened in the browser with:
```bash
sudo -u jenkins kubectl port-forward --address 0.0.0.0 svc/textile-sales-manager-svc 8081:80
```
then `http://<EC2-IP>:8081`. The header shows the build number, e.g. **build v1**.

## 8. What I changed for the second run
I changed the header tagline in `index.html` from "Sales desk · made simpler" to "Sales desk · deployed on Kubernetes" and committed it. Jenkins started build #2 automatically, pushed image `v2` and updated the pods. The browser then showed the new tagline and **build v2**.
