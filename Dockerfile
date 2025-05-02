FROM node:20-alpine

WORKDIR /app

# 1. Copy package files first (better caching)
COPY package*.json ./
COPY .env ./

# 2. Install production deps
RUN npm install --omit=dev

# 3. Create target directory explicitly
RUN mkdir -p /app/dist

# 4. Copy using relative path (Windows compatible)
COPY dist /app/dist/

# 5. Verify files were copied
RUN ls -la /app/dist/src

EXPOSE 3000

CMD ["node", "./dist/src/index.js"]