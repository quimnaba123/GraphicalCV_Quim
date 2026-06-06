# Builder stage
FROM docker.io/node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm install -D vite tailwindcss postcss autoprefixer

# Copy all source files
COPY index.html ./
COPY vite.config.js ./
COPY postcss.config.js ./
COPY src/ ./src/
COPY public/ ./public/

# Build the application
RUN npm run build

# Production stage with nginx
FROM docker.io/nginx:alpine

# Install curl for healthchecks
RUN apk add --no-cache curl

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Run nginx
CMD ["nginx", "-g", "daemon off;"]