# Interactive CV - Graphical Portfolio

A modern, visually stunning interactive CV website built with cutting-edge web technologies.

## 🎯 **IMPORTANT: This is the Refactored Version**

See [REFACTOR_GUIDE.md](./REFACTOR_GUIDE.md) for details about the refactored architecture and improvements.

## 🚀 Features

- **3D Background**: Interactive particle system using Three.js
- **Data Visualization**: Interactive charts using D3.js
- **Smooth Animations**: GSAP-powered transitions and animations
- **Responsive Design**: Mobile-first Tailwind CSS styling
- **Modern UI**: Glassmorphism effects and modern design patterns
- **Performance Optimized**: Production-ready build process with caching

## 🛠️ Tech Stack

- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics and animations
- **D3.js** - Data visualization and charts
- **GSAP** - High-performance animations
- **Nginx** - Production web server

## 📦 Prerequisites

- [Podman](https://podman.io/) installed (or Docker)
- Node.js 20+ installed

## 🚦 Quick Start

### Development

1. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   podman-compose up dev
   ```

3. **Access your CV**
   - Open http://localhost:5173 in your browser

4. **Hot reload enabled**
   - Any changes to source files automatically update the page

### Production Build

1. **Build the application**
   ```bash
   podman-compose --profile build up builder
   ```

2. **Run production server**
   ```bash
   podman-compose --profile production up production
   ```

3. **Access your CV**
   - Open http://localhost:8080 in your browser

### Alternative: Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## 📁 Project Structure

```
GraphicalCV_Quim/
├── src/
│   ├── config.js           # Centralized configuration
│   ├── data.js             # Data management
│   ├── background.js       # 3D background renderer
│   ├── visualizations.js   # D3.js chart renderer
│   ├── ui.js               # UI component renderer
│   ├── animations.js       # GSAP animation manager
│   ├── main.js             # Application orchestrator
│   └── styles.css          # Comprehensive styles
├── public/                 # Static assets
├── index.html              # Main HTML file
├── vite.config.js          # Vite configuration
├── postcss.config.js       # PostCSS configuration
├── Dockerfile              # Production Docker configuration
├── dev.Dockerfile          # Development Docker configuration
├── nginx.conf              # Nginx configuration
├── podman-compose.yml      # Podman compose configuration
└── REFACTOR_GUIDE.md       # Refactor documentation
```

## 🎨 Customization

### Update Your Content

Edit the data objects in `src/data.js`:

```javascript
export const experienceData = [
  {
    title: "Your Job Title",
    company: "Your Company",
    period: "2021 - Present",
    description: "Your job description",
    achievements: ["Achievement 1", "Achievement 2"]
  }
];

export const skillsData = { ... };
export const projectsData = [ ... ];
```

### Customize Styling

Edit `src/config.js` to change colors and settings:
```javascript
export const config = {
  colors: {
    primary: 'rgb(59, 130, 246)',
    // ... other colors
  },
  threeJS: {
    particleCount: 1500,
    // ... other settings
  }
};
```

### Update Theme

Modify the Tailwind classes in `index.html` or create a custom theme in `tailwind.config.js` (if needed).

## 🧪 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run clean        # Clean build artifacts and node_modules
npm run test         # Verify setup and installation
```

## 🐳 Podman Commands

```bash
podman-compose up dev           # Start development
podman-compose down            # Stop all services
podman-compose --profile build up builder  # Build production
podman-compose --profile production up production  # Run production
podman-compose logs dev         # View logs
```

## 📊 Performance Optimization

- **Modular Architecture**: Clean separation of concerns
- **Code Splitting**: Vite automatically splits vendor code
- **Tree Shaking**: Unused code is removed during build
- **Caching**: Nginx configured for static asset caching
- **Compression**: Gzip compression enabled for faster transfers
- **Optimized Rendering**: Better Three.js and D3.js performance

## 🔧 Troubleshooting

### Development server not starting
- Ensure port 5173 is available
- Check that all dependencies are installed: `npm install`
- Restart the container: `podman-compose restart dev`

### Build errors
- Clean and reinstall: `npm run clean && npm install`
- Check for syntax errors in JavaScript files
- Verify Node.js version (requires 20+)

### Production deployment issues
- Ensure nginx configuration is correct
- Check volume mounts for Docker
- Verify health check endpoints

## 📝 License

MIT License - feel free to use this template for your own projects!

## 🙏 Credits

Built with:
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
- [D3.js](https://d3js.org/)
- [GSAP](https://gsap.com/)
- [Nginx](https://nginx.org/)

---

Made with ❤️ using modern web technologies