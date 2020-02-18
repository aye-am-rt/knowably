FROM adoptopenjdk/openjdk11-openj9:alpine-jre
ADD target/data-populator-service-1.0-SNAPSHOT.jar /usr/src/data-populator-service-1.0-SNAPSHOT.jar
WORKDIR /usr/src
ENTRYPOINT ["java","-jar","data-populator-service-1.0-SNAPSHOT.jar"]