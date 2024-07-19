# Stage 1: Build the Spring Boot application
FROM maven:3.8.3-openjdk-17 AS spring-build
WORKDIR /app
COPY ./backend/pom.xml .
COPY ./backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Build the Vite-React application
FROM node:16 AS react-build
WORKDIR /app
COPY ./frontend/tp1/package*.json ./
RUN npm install
COPY ./frontend/tp1 .
RUN npm run build

# Stage 3: Final image
FROM openjdk:17-jdk-slim
WORKDIR /app

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Copy Spring Boot jar
COPY --from=spring-build /app/target/*.jar app.jar

# Copy Vite-React build
COPY --from=react-build /app/dist ./react-app

# Copy MySQL initialization script
COPY ./init-mysql.sql /docker-entrypoint-initdb.d/

# Install Nginx
RUN apt-get install -y nginx

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 8080 3306 80

# Start services
CMD service mysql start && \
    mysql < /docker-entrypoint-initdb.d/init-mysql.sql && \
    java -jar app.jar & \
    nginx -g 'daemon off;'