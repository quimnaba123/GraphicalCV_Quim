# Development stage
FROM docker.io/node:20-alpine AS dev

RUN apk add --no-cache wget

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
# debug port
EXPOSE 9229 

# Run development server
CMD ["sh", "-c", "NODE_OPTIONS='--inspect=0.0.0.0:9229' npm run dev -- --host 0.0.0.0"]