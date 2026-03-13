# Build stage
#Here the base image contains Maven 3.9.9, Java 21, and Ubuntu/Linux environment
# AS BUILD will name the stage build and allow anoher stage to copy files from it
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /build

COPY pom.xml .
COPY src ./src

# this will delete old compiled files, build and build new .jar files and skip running tests
RUN mvn clean package -DskipTests

# Runtime stage
#creates a new image stage as a runtime stage
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app
# Copies the compiled JAR from the build stage.
COPY --from=build /build/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java","-jar","/app/app.jar"]