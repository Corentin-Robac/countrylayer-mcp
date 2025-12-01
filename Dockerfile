# Use the official Node.js image.
FROM node:18-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy the local code to the container image.
COPY . .

# Build the TypeScript code.
RUN npm run build

# Run the web service on container startup.
CMD [ "node", "dist/src/web-server.js" ]

# Expose the port (Render/Railway usually set PORT env var, we need to listen on it)
# The Stdio transport doesn't use a port, but for a web deployment we need the SSEServerTransport.
# WAIT. My current `src/index.ts` is STDIO.
# I need a `src/web-server.ts` that uses Express + SSEServerTransport for the Docker deployment.
