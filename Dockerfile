#Use an official Node.js runtime as the base image
FROM node:latest

#Set the working directory in the container
WORKDIR /usr/src/app

#Copy package.json and package-lock.json to the working directory
COPY package*.json ./

#Install dependencies
RUN npm Install

#Copy the application code to the container
COPY . .

#Expose the port your app runs on
EXPOSE 3000

#Command to run the application
CMD [ "node index.js" ]