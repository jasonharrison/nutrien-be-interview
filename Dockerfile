# Use the official Node.js runtime as a parent image
FROM node:23.3.0

# Set the working directory in the container
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY tsconfig* *.csv /app/
COPY docker_scripts/ /app/docker_scripts
COPY seed_data/ /app/seed_data
COPY src/ /app/src

# Compile the TypeScript code
RUN npx tsc

# Expose the port that the server will run on
EXPOSE 3123

# Run the start script when the container launches
CMD ["docker_scripts/start.sh"]