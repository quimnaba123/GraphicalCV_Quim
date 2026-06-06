# Development stage
FROM docker.io/node:20-alpine AS dev

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY index.html ./
COPY vite.config.js ./
COPY postcss.config.js ./
COPY src/ ./src/

# Expose development port
EXPOSE 5173

# Run development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]