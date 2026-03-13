

// STEP 5 create a network over which all microservices will communicate
docker network create microservices-net

// STEP 6 RUN POSTGRES CONTAINER
docker run -d \
--name postgres-db \
--network microservices-net \
-e POSTGRES_DB=customerdb \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-p 5432:5432 \
postgres:15

// STEP 7 RUN PGADMIN CONTAINER
docker run -d \
--name pgadmin \
--network microservices-net \
-e PGADMIN_DEFAULT_EMAIL=admin@admin.com \
-e PGADMIN_DEFAULT_PASSWORD=admin \
-p 5050:80 \
dpage/pgadmin4

//STEP 8 RUN ORDER MICROSERVICE
docker run -d \
--name order-service \
--network microservices-net \
-e SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-db:5432/customerdb \
-e SPRING_DATASOURCE_USERNAME=postgres \
-e SPRING_DATASOURCE_PASSWORD=postgres \
-p 8081:8081 \
order-service

// STEP 9 RUN CUSTOMER MICROSERVICE
docker run -d \
--name customer-service \
--network microservices-net \
-e SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-db:5432/customerdb \
-e SPRING_DATASOURCE_USERNAME=postgres \
-e SPRING_DATASOURCE_PASSWORD=postgres \
-e ORDER_SERVICE_URL=http://order-service:8081 \
-p 8080:8080 \
customer-service

//STEP 10 RUN REACT FRONTEND AS A CONTAINER
docker run -d \
--name react-frontend \
--network microservices-net \
-p 3000:80 \
react-frontend