FROM adoptopenjdk/openjdk11-openj9:alpine-jre

ADD ./target/config-server-0.0.1-SNAPSHOT.jar /usr/src/config-server-0.0.1-SNAPSHOT.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "config-server-0.0.1-SNAPSHOT.jar"]