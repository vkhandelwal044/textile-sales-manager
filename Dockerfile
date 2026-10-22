# Start from a small image that already has the Nginx web server
FROM nginx:alpine

# Copy our app into the folder Nginx serves
COPY index.html /usr/share/nginx/html/index.html

# Show the Jenkins build number in the app header (e.g. "build v2")
ARG APP_VERSION=dev
RUN sed -i "s/build local/build ${APP_VERSION}/" /usr/share/nginx/html/index.html

# The app is served on port 80
EXPOSE 80
