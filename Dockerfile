# Use an official Node.js runtime as the base image
FROM node:20.11.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install
RUN npm install express
# Copy the rest of the project files into the container
COPY . .

# Set the environment variable to specify the port
ENV PORT=3600

# Expose the port that the app will run on
EXPOSE 3600

# Command to run the Node.js app
CMD ["npm", "run", "server"]
