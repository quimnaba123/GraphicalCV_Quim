import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Graphical CV project setup...\n');

const checks = [];

// Check 1: Required files exist
console.log('📁 Checking required files...');
const requiredFiles = [
  'package.json',
  'vite.config.js',
  'postcss.config.js',
  'Dockerfile',
  'dev.Dockerfile',
  'nginx.conf',
  'index.html',
  'src/main.js',
  'src/styles.css',
  'podman-compose.yml'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✓ ${file}`);
    checks.push({ file, status: 'ok' });
  } else {
    console.log(`  ✗ ${file} - NOT FOUND`);
    checks.push({ file, status: 'missing' });
  }
});

console.log();

// Check 2: Check dependencies
console.log('📦 Checking dependencies...');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const requiredDeps = ['d3', 'gsap', 'three'];
const requiredDevDeps = ['vite', 'tailwindcss', 'postcss', 'autoprefixer'];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`  ✓ ${dep} (${packageJson.dependencies[dep]})`);
    checks.push({ file: `${dep} dependency`, status: 'ok' });
  } else {
    console.log(`  ✗ ${dep} - NOT INSTALLED`);
    checks.push({ file: `${dep} dependency`, status: 'missing' });
  }
});

requiredDevDeps.forEach(dep => {
  if (packageJson.devDependencies[dep]) {
    console.log(`  ✓ ${dep} (${packageJson.devDependencies[dep]})`);
    checks.push({ file: `${dep} devDependency`, status: 'ok' });
  } else {
    console.log(`  ✗ ${dep} - NOT INSTALLED`);
    checks.push({ file: `${dep} devDependency`, status: 'missing' });
  }
});

console.log();

// Check 3: Check directory structure
console.log('📁 Checking directory structure...');
const srcFiles = fs.readdirSync(path.join(__dirname, 'src'));
if (srcFiles.length > 0) {
  console.log(`  ✓ src/ directory exists with files: ${srcFiles.join(', ')}`);
  checks.push({ file: 'src directory', status: 'ok' });
} else {
  console.log('  ✗ src/ directory is empty');
  checks.push({ file: 'src directory', status: 'empty' });
}

// Summary
console.log('\n' + '='.repeat(50));
const passed = checks.filter(c => c.status === 'ok').length;
const failed = checks.filter(c => c.status === 'missing' || c.status === 'empty').length;
const total = checks.length;

console.log(`✅ Setup Verification: ${passed}/${total} checks passed`);

if (failed > 0) {
  console.log(`❌ ${failed} checks failed. Please review the output above.`);
  console.log('\n💡 To fix missing files, run: npm install');
  process.exit(1);
} else {
  console.log('🎉 All checks passed! Your project is ready to use.');
  console.log('\n📝 Next steps:');
  console.log('  1. Start development: npm run dev');
  console.log('  2. Or use podman: podman-compose up dev');
  console.log('  3. Visit http://localhost:5173');
}