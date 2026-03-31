// CREATING A NETWORK
docker network create joe-network

// LIST ALL NETWORKS
docker network ls

// DELETE A NETWORK
docker network rm joe-network

// INSPECT A NETWORK
docker network inspect joe-network

// display the subnet of your network
docker network inspect joe-network | grep Subnet

// create a none network
docker run -d --network none alpine sleep 1000


// display the gateway of your network
docker network inspect sample-net | grep gateway

//USING A CONTAINER WITHOUT A NETWORK
docker run --name c1 -it --rm alpine:latest /bin/sh

docker run --name c2 -it --rm alpine:latest /bin/sh

//INPECT THE NETWORK SETTINGS FROM OUTSIDE
//  OF THE CONTAINER
docker container inspect c1
docker container inspect c2

// INSPECT THE NETWORK SETTINGS
//  OF THE CONTAINER FROM INSIDE THE CONTAINER
// AND ALSO DISPLAY ROUTING REQUEST
docker exec -it c1 /bin/sh
ip addr
ip route

// RUN A SECOND CONTAINER AND CHECKOUT THE IP ADDRESS
docker container run --name c2 -d --rm alpine:latest ping 127.0.0.1



// this will create a docker network
docker network create mongo

//this will download version 5 of mongodb image
docker pull mongo:5.0.1

// this run a mongodb container and attach it to a network
docker run --name mongo -d --network mongo -p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=root \
-e MONGO_INITDB_ROOT_PASSWORD=secret mongo:5.0.1

// this will log you into the mongdb database from inside a container
mongosh -u root -p secret --authenticationDatabase admin

//this will download version 5 of mongo-express
docker pull mongo-express

// this will run a mongo-express container while attaching it to a network
docker run --name mongo-express --network mongo -d -p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=root \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=secret \
-e ME_CONFIG_MONGODB_AUTH_DATABASE=admin \
-e ME_CONFIG_BASICAUTH_USERNAME=root \
-e ME_CONFIG_BASICAUTH_PASSWORD=secret \
-e ME_CONFIG_MONGODB_SERVER=mongo mongo-express

docker network disconnect mongo mongo-express

docker network connect mongo mongo-express


// this will inspect your docker network
docker network inspect mongo









// this will the logs of your container
docker logs mongo


docker network connect mongo user-api 
docker network connect mongo dashboard-v1

docker network disconnect mongo user-api
docker network disconnect mongo dashboard-v1

