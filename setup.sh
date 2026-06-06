#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up Graphical CV Project...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 20 or higher from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) is installed${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm $(npm -v) is installed${NC}"

# Install dependencies
echo -e "\n${BLUE}📦 Installing dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${YELLOW}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Check if Podman is available
if command -v podman-compose &> /dev/null; then
    echo -e "${BLUE}🐳 Podman Compose detected${NC}"
    echo -e "${GREEN}✓ Ready to run with podman-compose${NC}"
    echo -e "\n${YELLOW}To start development:${NC}"
    echo "  podman-compose up dev"
    echo -e "\n${YELLOW}To build and run production:${NC}"
    echo "  podman-compose --profile production up production"
else
    echo -e "${BLUE}🐳 Docker Compose detected${NC}"
    echo -e "${GREEN}✓ Ready to run with docker-compose${NC}"
    echo -e "\n${YELLOW}To start development:${NC}"
    echo "  docker-compose up dev"
    echo -e "\n${YELLOW}To build and run production:${NC}"
    echo "  docker-compose --profile production up production"
fi

echo -e "\n${BLUE}📚 Additional commands:${NC}"
echo "  npm run dev          # Start local dev server"
echo "  npm run build        # Build for production"
echo "  npm run preview      # Preview production build"
echo "  npm run clean        # Clean build artifacts"

echo -e "\n${GREEN}🎉 Setup complete! Check README.md for more details.${NC}"