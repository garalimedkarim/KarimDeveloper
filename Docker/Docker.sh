Plural Sight: Getting Started with Docker - Nigel Poulton:


Course Overview
Course Introduction

Installing Docker:



Official Docker Website:

Get started with docker:

Part 1 : Orientation
	> docker ps // to see active process (like in linux)
	#Setup:
		# not from Docker site:
		> sudo apt-get install docker

		# We are enable to run docker without sudo
		> sudo groupadd docker
		> sudo usermod -aG docker $USER
		Restart:
		> docker run hello-world
		
Part 2 : Containers:
	1) Define a container with creating "Dockerfile":

	# Use an official Python runtime as a parent image
	FROM python:2.7-slim

	# Set the working directory to /app
	WORKDIR /app

	# Copy the current directory contents into the container at /app
	ADD . /app

	# Install any needed packages specified in requirements.txt
	RUN pip install --trusted-host pypi.python.org -r requirements.txt

	# Make port 80 available to the world outside this container
	EXPOSE 80

	# Define environment variable
	ENV NAME World

	# Run app.py when the container launches
	CMD ["python", "app.py"]
	
	2) Build the app:
		# create image
		> docker build -t friendlyhello .		
		# list images
		> docker images
		
	3) Run the app:
		# run => create container to be runned in
		> docker run -p 4000:80 friendlyhello
		#Test:
		> curl http://localhost:4000
		# list containers runned :
		> docker container ls
		!> docker ps -a
		
		# run on background:
		> docker run -d -p 4000:80 friendlyhello
		# stop on background:
		> docker containers ls 
		> docker container stop 1fa4ab2cf395

	4) Share your image:
		=> Account in : https://cloud.docker.com/
		> docker login
		#Tag image:
		#docker tag image username/repository:tag
		>docker tag friendlyhello garalimedkarim/get-started:friendlyhelloTest
		#Push Image:
		> docker push garalimedkarim/get-started:friendlyhelloTest
		#See your remote images:
		https://hub.docker.com
		#Pull Image:
		> docker run -p 4000:80 username/repository:tag #If the image isn’t available locally on the machine, Docker will pull it from the repository.
		#Delete Image:
		# docker rmi repository:tag
		> docker rmi garalimedkarim/get-started:friendlyhelloTest
		
		# show all images: (include untagged ones)
		> docker image -a
	
	Recap and Cheat Sheet:
		docker build -t friendlyhello .  # Create image using this directory's Dockerfile
		docker run -p 4000:80 friendlyhello  # Run "friendlyname" mapping port 4000 to 80
		docker run -d -p 4000:80 friendlyhello         # Same thing, but in detached mode
		docker container ls                                # List all running containers
		docker container ls -a             # List all containers, even those not running
		docker container stop <hash>           # Gracefully stop the specified container
		docker container kill <hash>         # Force shutdown of the specified container
		docker container rm <hash>        # Remove specified container from this machine
		docker container rm $(docker container ls -a -q)         # Remove all containers
		docker image ls -a                             # List all images on this machine
		docker image rm <image id>            # Remove specified image from this machine
		docker image rm $(docker image ls -a -q)   # Remove all images from this machine
		docker login             # Log in this CLI session using your Docker credentials
		docker tag <image> username/repository:tag  # Tag <image> for upload to registry
		docker push username/repository:tag            # Upload tagged image to registry
		docker run username/repository:tag 	

		
Part 3 : Services:
	
	Create docker-compose.yml:
		version: "3"
		services:
		  web:
			# replace username/repo:tag with your name and image details
			image: username/repo:tag
			deploy:
			  replicas: 5
			  resources:
				limits:
				  cpus: "0.1"
				  memory: 50M
			  restart_policy:
				condition: on-failure
			ports:
			  - "80:80"
			networks:
			  - webnet
		networks:
  		webnet:

	Run your new load-balanced app:
	
		> docker swarm init 
			> docker swarm init --advertise-addr 172.17.0.1
		
		> docker stack deploy -c docker-compose.yml getstartedlab
		> docker ps
		
		> docker service ls
		> docker service ps getstartedlab_web
		
		> docker stack rm getstartedlab
		> docker swarm leave --force




	
