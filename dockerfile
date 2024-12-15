# Use the Node.js 16 image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the entire app code into the container
COPY . .

# Expose the application port
EXPOSE 3123

# Set the default command to start the app
CMD ["node", "index.js"]
