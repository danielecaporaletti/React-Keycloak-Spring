# Primo stage: build dell'applicazione
FROM maven:3.8.4-openjdk-11 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package

# Secondo stage: immagine finale con JRE
FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/target/contacts-resource-server-0.0.1-SNAPSHOT.jar ./app.jar
ENTRYPOINT ["java", "-jar", "./app.jar"]
