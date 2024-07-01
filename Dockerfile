# Defining the base image 
FROM node:20-alpine 

# Create a working directory inside the container
WORKDIR /app
.
# Copy files to the container
COPY . /app/

# Install the dependencies
RUN npm install

# Exposig the port on the container 
EXPOSE 4000

# Define the command to run the application
CMD [ "node", "index.js" ]