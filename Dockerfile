# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy only the required files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose the application port (still needed for container)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:ts"]
