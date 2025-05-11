# Use official Node.js image
FROM node:20

# Set build-time environment variables
ARG PORT
ARG NODE_ENV
ARG MONGODB_URI
ARG ACCESS_TOKEN_EXP
ARG ACCESS_TOKEN_KEY

# Set working directory
WORKDIR /app

# Copy app files
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Set environment variables for runtime (avoid secret ones here)
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV

# Expose app port
EXPOSE $PORT

# Start the app
CMD ["npm", "run", "start:ts"]
