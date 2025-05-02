# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and tsconfig
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

# Install dependencies (including ts-node)
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port (change if needed)
EXPOSE 3000

# Start the app using ts-node
CMD ["npm", "run", "start:ts"]
