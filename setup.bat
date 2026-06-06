@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo 🚀 Setting up Graphical CV Project...
echo ========================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    echo Please install Node.js 20 or higher from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js !NODE_VERSION! is installed

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✓ npm !NPM_VERSION! is installed

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if %errorlevel% equ 0 (
    echo ✓ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Check for Podman or Docker
where podman-compose >nul 2>nul
if %errorlevel% equ 0 (
    echo 🐳 Podman Compose detected
    echo ✓ Ready to run with podman-compose
    echo.
    echo To start development:
    echo   podman-compose up dev
    echo.
    echo To build and run production:
    echo   podman-compose --profile production up production
) else (
    where docker-compose >nul 2>nul
    if %errorlevel% equ 0 (
        echo 🐳 Docker Compose detected
        echo ✓ Ready to run with docker-compose
        echo.
        echo To start development:
        echo   docker-compose up dev
        echo.
        echo To build and run production:
        echo   docker-compose --profile production up production
    ) else (
        echo ⚠️  Neither Podman nor Docker Compose detected
        echo You can still run the local development server
        echo.
        echo To start development:
        echo   npm run dev
    )
)

echo.
echo 📚 Additional commands:
echo   npm run dev          ^- Start local dev server
echo   npm run build        ^- Build for production
echo   npm run preview      ^- Preview production build
echo   npm run clean        ^- Clean build artifacts

echo.
echo 🎉 Setup complete! Check README.md for more details.
echo.
pause