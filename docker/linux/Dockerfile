FROM node:lts-alpine

WORKDIR /app

# Install dependencies without prepare scripts
COPY package*.json tsconfig.json ./
RUN npm install --ignore-scripts

# Build application
COPY src ./src
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Default start
CMD ["node","dist/index.js"]

# Expose port
EXPOSE 3001