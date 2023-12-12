# Use an official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
#COPY FRONT-END/package.json FRONT-END/package-lock.json ./
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Set the working directory to the FRONT-END directory
#WORKDIR /usr/src/app/FRONT-END

# Install react-scripts globally (you might need to adjust this based on your project's structure)
# RUN npm install react-scripts

#RUN npm install

RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

# Command to run the application
CMD ["npm", "start"]