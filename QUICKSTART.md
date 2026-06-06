# 🚀 Quick Start Guide

Get your interactive CV up and running in minutes!

## Option 1: Local Development (Easiest)

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start the development server
npm run dev

# 3. Visit http://localhost:5173
```

**That's it!** The server starts with hot reload enabled.

## Option 2: Using Podman

```bash
# 1. Install dependencies
./setup.sh

# 2. Start development server
podman-compose up dev

# 3. Visit http://localhost:5173
```

**With Podman**, you get:
- Isolated development environment
- No conflicts with host system
- Easier testing in containerized environment
- Production deployment ready

## Option 3: Production Deployment

```bash
# 1. Build the application
npm run build

# 2. Run with Podman
podman-compose --profile production up production

# 3. Visit http://localhost:8080
```

## 📝 First Steps After Setup

1. **Edit your content** - Open `src/main.js` and update:
   - `experienceData` with your work history
   - `skillsData` with your technical skills
   - `projectsData` with your actual projects

2. **Customize the design** - Check `src/styles.css` for styling options

3. **Update your info** - Edit `index.html` for personal details

## 🎨 Common Customizations

### Update Your Name
```javascript
// In src/main.js
const experienceData = [
  {
    title: "Your Job Title",  // Change this
    company: "Your Company",   // Change this
    // ...
  }
];
```

### Change Colors
```css
/* In src/styles.css */
:root {
  --primary-color: #3b82f6;  /* Change this to your brand color */
}
```

### Add More Projects
```javascript
// In src/main.js
const projectsData = [
  {
    title: "Your Project Name",
    description: "Brief description",
    tech: ["React", "Node.js"],  // Add your tech stack
    link: "#"
  }
];
```

## 🔧 Useful Commands

```bash
npm run dev          # Start local dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run clean        # Clean build artifacts
```

## 📱 Running on Mobile

1. **Local Development**:
   ```bash
   npm run dev
   # Then on your phone: http://your-computer-ip:5173
   ```

2. **Podman**:
   ```bash
   podman-compose up dev
   # Then on your phone: http://your-computer-ip:5173
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

## 📚 More Information

- **Full Documentation**: See `README.md`
- **Contributing**: See `CONTRIBUTING.md`
- **Project Summary**: See `PROJECT_SUMMARY.md`

---

**Need help?** Check the logs or open an issue!

🎉 **Your interactive CV is ready to customize!**