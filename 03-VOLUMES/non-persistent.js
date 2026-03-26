// login to an ubuntu container
docker run -it --name  test-container ubuntu bash
// create file and populate file with content
echo "Hello From Ubuntu" > file.txt
// list files and folders
ls
// display content
cat file.txt
// logout of the conainer
exit
// delete the container
docker rm test-container
//
docker run -it ubuntu bash
ls
// view the contents of the same container after logging into the container
docker run bash bash -c "cat bar.txt" 

// MAKE OUR CONTAINER STATEFUL
docker volume create mydata
docker volume ls

// RUN A CONTAINER AND MOUNT A DOCKER VOLUME
docker run -it -v mydata:/data ubuntu bash
// create file and populate file with content
echo "Hello From Ubuntu" > /data/file.txt
// list files and folders
ls
// display content
cat /data/file.txt
// logout of the conainer
exit

docker rm <container_id>

// RUN A NEW CONTAINER
docker run -it -v mydata:/data ubuntu bash

//
cat /data/file.txt


// BIND MOUNT OR HOST VOLUMES
// GO TO DESKTOP FOLDER AND CREATE A BIND MOUNT FOLDER
docker run -it --name alpine-test \
-v $(pwd)/host-data:/data \
alpine:latest sh

// CREATE A FILE INSIDE THE CONTAINER
echo "Hello From Alpine" > /data/test.txt
// VERIFY FILE INSIDE CONTAINER
cat /data/test.txt

// LOGOUT
exit
// VERIFY FILE CONTENT
cat host-data/test.txt






docker run -v $PWD:/tmp bash \
bash -c "echo foo > /tmp/bar.txt && cat /tmp/bar.txt"

// double check to see the information is on the host
ls

// check the contents of that file
cat bar.txt

// run a new container and check if the file is still present
docker run -v $(PWD):/tmp bash \
bash -c "cat /tmp/bar.txt"

// mount a bootstrap website to a running container via volumes
docker run --name dashboard \
-v "`pwd -W`:/usr/share/nginx/html" -d -p 8080:80 nginx

docker ps