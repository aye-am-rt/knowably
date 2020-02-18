cd frontend;
npm install --save-dev @angular-devkit/build-angular;
ng build;

cd ..
sudo mvn clean package -DskipTests;
sudo docker-compose up --build -d config-server;
sudo docker-compose up --scale nlp-microservice=3 --build --no-recreate;
