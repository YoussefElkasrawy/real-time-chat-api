# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Define build-time variables
ARG PORT
ARG NODE_ENV
ARG MONGODB_URI
ARG ACCESS_TOKEN_EXP
ARG ACCESS_TOKEN_KEY

# Set environment variables from build args
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV MONGODB_URI=$MONGODB_URI
ENV ACCESS_TOKEN_EXP=$ACCESS_TOKEN_EXP
ENV ACCESS_TOKEN_KEY=$ACCESS_TOKEN_KEY

# Copy and install dependencies
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE $PORT

# Start the app
CMD ["npm", "run", "start:ts"]
