# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and tsconfig
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port (non-secret)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:ts"]