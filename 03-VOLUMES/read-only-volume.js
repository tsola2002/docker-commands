// we are creating a container called writer that has a volume, shared-data, mounted in default read/write mode.
docker run -it --name writer -v shared-data:/data alpine sh

// create a file inside this container like this
echo "I can create a file" > /data/sample.txt

// this will create a container called reader that has the same volume mounted as read-only (ro)
docker run -it --name reader -v shared-data:/app/data:ro ubuntu:22.04 sh

// check the contents of the file
ls -la /app/data

// try to create another  file like this 
echo "Try to break read/only" > /app/data/data.txt