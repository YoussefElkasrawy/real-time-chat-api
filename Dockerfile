# Stage 1: Builder - Creates the dist folder
FROM node:20-alpine AS builder

WORKDIR /build

# 1. Copy all files needed for build
COPY package*.json ./
COPY .env ./
COPY src ./src
COPY tsconfig.json ./

# 2. Install ALL dependencies (including devDependencies)
RUN npm install --include=dev

# 3. Build the project
RUN npm run build

# 4. Verify dist was created
RUN ls -la /build/dist

# Stage 2: Runtime - Production image
FROM node:20-alpine

WORKDIR /app

# 1. Copy only production files
COPY package*.json ./
COPY .env ./

# 2. Install only production dependencies
RUN npm install --omit=dev

# 3. Copy pre-built dist from builder
COPY --from=builder /build/dist ./dist

# 4. Verify copy worked
RUN ls -la /app/dist

EXPOSE 3000

CMD ["node", "./dist/src/index.js"]