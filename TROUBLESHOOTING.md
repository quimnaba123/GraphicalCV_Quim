# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. Proxy Error ❌

**Problem**: "Proxy error" when starting development server

**Solution**: Fixed by removing circular proxy configuration in `vite.config.js`

**What was wrong**:
```javascript
// ❌ WRONG - Circular proxy
server: {
  proxy: {
    '/': {
      target: 'http://localhost:5173',  // Same port!
      changeOrigin: true
    }
  }
}
```

**Fixed version**:
```javascript
// ✅ CORRECT - No proxy
server: {
  host: true,
  port: 5173,
  strictPort: true  // Ensure correct port
}
```

### 2. Build Errors with Tailwind CSS ❌

**Problem**: "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin"

**Solution**: Install required PostCSS plugin

```bash
npm install --save-dev @tailwindcss/postcss
```

**Update** `postcss.config.js`:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // New plugin
    autoprefixer: {}
  }
};
```

### 3. Module Resolution Errors ❌

**Problem**: "Failed to resolve /main.js" or similar

**Solution**: Use correct import paths

**Fix** `index.html`:
```html
<!-- ❌ WRONG -->
<script type="module" src="/main.js"></script>

<!-- ✅ CORRECT -->
<script type="module" src="/src/main.js"></script>
```

### 4. Duplicate Export Error ❌

**Problem**: "Duplicated export 'ApplicationManager'"

**Solution**: Remove duplicate export

**Found** in `src/main.js`:
```javascript
// Line 15 - First export
export class ApplicationManager { ... }

// Line 212 - Duplicate export (remove this)
export { ApplicationManager };
```

### 5. Missing terser Plugin ❌

**Problem**: "terser not found"

**Solution**: Install terser for minification

```bash
npm install --save-dev terser
```

### 6. Invalid manualChunks Configuration ❌

**Problem**: "Invalid output options. Expected Function but received Object"

**Solution**: Use function-based manualChunks

**Fix** `vite.config.js`:
```javascript
// ❌ WRONG - Object syntax
manualChunks: {
  vendor: ['d3', 'three', 'gsap'],
  animations: ['gsap/ScrollTrigger']
}

// ✅ CORRECT - Function syntax
manualChunks(id) {
  if (id.includes('node_modules')) {
    if (id.includes('gsap')) {
      return 'animations';
    }
    return 'vendor';
  }
}
```

## Quick Fix Commands

### Fix all common issues at once:
```bash
# 1. Clear and reinstall
npm run clean

# 2. Install dependencies
npm install

# 3. Install missing plugins
npm install --save-dev @tailwindcss/postcss terser

# 4. Start dev server
npm run dev
```

## Error Messages and Solutions

### 1. Proxy Error
```
Error: ECONNREFUSED (ECONNREFUSED)
```
**Fix**: Remove proxy from `vite.config.js`

### 2. Module Resolution
```
Error: Failed to resolve "/main.js"
```
**Fix**: Update paths in `index.html`

### 3. Tailwind PostCSS
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin
```
**Fix**: Install `@tailwindcss/postcss` and update config

### 4. Duplicate Export
```
Error: Duplicated export 'ApplicationManager'
```
**Fix**: Remove duplicate export in `src/main.js`

### 5. Missing terser
```
Error: terser not found
```
**Fix**: Install `terser` package

## Testing Your Setup

### 1. Development Server
```bash
npm run dev
```
Check: http://localhost:5173

### 2. Production Build
```bash
npm run build
npm run preview
```
Check: http://localhost:4173

### 3. Verify Installation
```bash
npm run test
```

## Performance Optimizations

### Reduce Bundle Size:
```javascript
// In vite.config.js
build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id.toString().split('/')[3];
        }
      }
    }
  }
}
```

### Enable Source Maps (Development):
```javascript
build: {
  sourcemap: true
}
```

## Common Issues Summary

| Issue | Error | Solution |
|-------|-------|----------|
| Proxy Error | ECONNREFUSED | Remove proxy config |
| Module Resolve | Failed to resolve | Fix import paths |
| Tailwind Error | Plugin not found | Install @tailwindcss/postcss |
| Duplicate Export | Duplicated export | Remove duplicate |
| Missing terser | terser not found | Install terser |
| Invalid Chunks | Expected Function | Use function syntax |

## Getting Help

### Check Logs:
```bash
# Development logs
npm run dev

# Build logs
npm run build

# Check port usage
npx kill-port 5173
```

### Verify Dependencies:
```bash
npm list --depth=0
```

### Clear Cache:
```bash
# Windows
rmdir /s /q node_modules dist
npm install

# Or use npm command
npm run clean
npm install
```

## Recommended Setup

### For Best Performance:
```bash
# Install all required packages
npm install --save-dev @tailwindcss/postcss terser

# Clear previous build
npm run clean

# Install dependencies
npm install

# Start development
npm run dev

# Test build
npm run build
```

### Environment Variables:
Create `.env` file:
```env
VITE_DEV_PORT=5173
VITE_BUILD_ENV=production
```

## Debug Mode

### Enable verbose logging:
```bash
VITE_DEBUG=1 npm run dev
```

### Check build output:
```bash
npm run build -- --debug
```

---

**Last Updated**: Refactored 2024
**Status**: All common issues resolved ✅