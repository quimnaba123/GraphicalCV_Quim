# 🚀 Quick Start Guide

## Option 1: Local Development

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start the development server
npm run dev

# 3. Visit http://localhost:5173
```
## Option 2: Using Podman

```bash
# 1. Install dependencies
./setup.sh

# 2. Start development server
podman-compose up dev

# 3. Visit http://localhost:5173
```

## Option 3: Production Deployment

```bash
# 1. Build the application
npm run build

# 2. Run with Podman
podman-compose --profile production up production

# 3. Visit http://localhost:8080
```

## 🐛 Troubleshooting

**Server won't start?**
```bash
# Kill any existing Node processes
npx kill-port 5173

# Then restart
npm run dev
```

**Port already in use?**
```bash
# Use a different port
npm run dev -- --port 5174
```

**Build errors?**
```bash
# Clean and reinstall
npm run clean
npm install
npm run build
```

**Need help?** Check the logs or open an issue!

🎉 **Your interactive CV is ready to customize!**