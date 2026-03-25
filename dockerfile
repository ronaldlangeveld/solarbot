# Use the official Bun image as the base image
FROM oven/bun:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy the entire app code into the container
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Expose the application port
EXPOSE 3123

# Set the default command to start the app
CMD ["sh", "-c", "bunx prisma migrate deploy && bun index.ts"]
