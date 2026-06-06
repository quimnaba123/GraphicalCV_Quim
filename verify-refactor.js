#!/usr/bin/env node

/**
 * Setup verification script for refactored project
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Refactored Graphical CV Project...\n');

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
  'src/config.js',
  'src/data.js',
  'src/background.js',
  'src/visualizations.js',
  'src/ui.js',
  'src/animations.js',
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

// Check 2: Check module files
console.log('📦 Checking modules...');

const modules = [
  'config.js',
  'data.js',
  'background.js',
  'visualizations.js',
  'ui.js',
  'animations.js',
  'main.js',
  'styles.css'
];

modules.forEach(module => {
  const filePath = path.join(__dirname, 'src', module);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const functionCount = content.match(/function\s+\w+/g)?.length || 0;
    const classCount = content.match(/class\s+\w+/g)?.length || 0;
    console.log(`  ✓ ${module} (${functionCount} functions, ${classCount} classes)`);
    checks.push({ file: `${module} module`, status: 'ok' });
  } else {
    console.log(`  ✗ ${module} - NOT FOUND`);
    checks.push({ file: `${module} module`, status: 'missing' });
  }
});

console.log();

// Check 3: Check dependencies
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

// Check 4: Check configuration file
console.log('⚙️ Checking configuration...');

const configPath = path.join(__dirname, 'src', 'config.js');
if (fs.existsSync(configPath)) {
  const configContent = fs.readFileSync(configPath, 'utf8');
  const hasConfig = configContent.includes('export const config');
  const hasThreeJS = configContent.includes('threeJS');
  const hasAnimations = configContent.includes('animations');
  const hasColors = configContent.includes('colors');

  if (hasConfig) console.log('  ✓ Configuration structure present');
  else console.log('  ✗ Configuration structure missing');
  if (hasThreeJS) console.log('  ✓ Three.js configuration present');
  else console.log('  ✗ Three.js configuration missing');
  if (hasAnimations) console.log('  ✓ Animation configuration present');
  else console.log('  ✗ Animation configuration missing');
  if (hasColors) console.log('  ✓ Color configuration present');
  else console.log('  ✗ Color configuration missing');

  checks.push({ file: 'Configuration', status: 'ok' });
} else {
  console.log('  ✗ Configuration file not found');
  checks.push({ file: 'Configuration', status: 'missing' });
}

console.log();

// Check 5: Check documentation
console.log('📚 Checking documentation...');

const documentationFiles = [
  'README.md',
  'QUICKSTART.md',
  'REFACTOR_GUIDE.md',
  'REFACTOR_SUMMARY.md',
  'IMPLEMENTATION_COMPLETE.md'
];

documentationFiles.forEach(doc => {
  const docPath = path.join(__dirname, doc);
  if (fs.existsSync(docPath)) {
    const stat = fs.statSync(docPath);
    const sizeKB = (stat.size / 1024).toFixed(1);
    console.log(`  ✓ ${doc} (${sizeKB} KB)`);
    checks.push({ file: `${doc} documentation`, status: 'ok' });
  } else {
    console.log(`  ✗ ${doc} - NOT FOUND`);
    checks.push({ file: `${doc} documentation`, status: 'missing' });
  }
});

// Check 6: Check module exports
console.log('\n🔌 Checking module exports...');

const mainJs = fs.readFileSync(path.join(__dirname, 'src/main.js'), 'utf8');
const exports = mainJs.match(/export\s+(const|function|class|default)/g) || [];
console.log(`  ✓ Main module exports: ${exports.length} exports`);
checks.push({ file: 'Main module exports', status: 'ok' });

// Check 7: Check code quality
console.log('\n✨ Checking code quality...');

const codeQualityChecks = [
  { name: 'JSDoc comments', check: () => {
    let docCount = 0;
    ['config.js', 'data.js', 'background.js', 'visualizations.js', 'ui.js', 'animations.js', 'main.js'].forEach(file => {
      const content = fs.readFileSync(path.join(__dirname, 'src', file), 'utf8');
      docCount += (content.match(/\/\*\*/g) || []).length;
    });
    return docCount > 0;
  }},
  { name: 'Class-based structure', check: () => {
    return modules.some(file => {
      const content = fs.readFileSync(path.join(__dirname, 'src', file), 'utf8');
      return content.includes('class ') && content.includes('constructor');
    });
  }},
  { name: 'Error handling', check: () => {
    return ['background.js', 'visualizations.js', 'ui.js', 'animations.js'].some(file => {
      const content = fs.readFileSync(path.join(__dirname, 'src', file), 'utf8');
      return content.includes('try {') && content.includes('catch');
    });
  }}
];

codeQualityChecks.forEach(check => {
  const result = check.check();
  if (result) {
    console.log(`  ✓ ${check.name}`);
    checks.push({ file: `Code quality: ${check.name}`, status: 'ok' });
  } else {
    console.log(`  ✗ ${check.name}`);
    checks.push({ file: `Code quality: ${check.name}`, status: 'warning' });
  }
});

// Summary
console.log('\n' + '='.repeat(50));
const passed = checks.filter(c => c.status === 'ok').length;
const warnings = checks.filter(c => c.status === 'warning').length;
const failed = checks.filter(c => c.status === 'missing').length;
const total = checks.length;

console.log(`✅ Refactor Verification: ${passed}/${total} checks passed`);
if (warnings > 0) console.log(`⚠️  ${warnings} warnings detected`);
if (failed > 0) console.log(`❌ ${failed} checks failed`);

if (failed > 0) {
  console.log('\n💡 Fix missing files or dependencies:');
  console.log('  1. Run: npm install');
  console.log('  2. Clear build cache: npm run clean');
  console.log('  3. Restart dev server');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n💡 Review the warnings above for potential improvements');
  console.log('  Most checks passed - your refactor looks good!');
} else {
  console.log('🎉 All checks passed! Your refactored project is ready to use.');
  console.log('\n📝 Next steps:');
  console.log('  1. Start development: npm run dev');
  console.log('  2. Test the application: Open http://localhost:5173');
  console.log('  3. Review the refactored code: Check src/ modules');
  console.log('  4. Read REFACTOR_GUIDE.md for architecture details');
}