# EpicReuse Build and Run Script
# This script will set up and run both frontend and backend parts of the application

Write-Host "🚀 Setting up EpicReuse project..." -ForegroundColor Cyan

# Create .env file for backend if it doesn't exist
$envFilePath = "backend\.env"
if (-not (Test-Path $envFilePath)) {
    Write-Host "Creating backend .env file..." -ForegroundColor Yellow
    @"
# OpenAI API Configuration
OPENAI_API_BASE=https://your-openai-endpoint.openai.azure.com
OPENAI_DEPLOYMENT_NAME=your-deployment-name
OPENAI_API_VERSION=2023-05-15
OPENAI_API_KEY=your-api-key

# Server Configuration
PORT=5000
"@ | Set-Content $envFilePath
    Write-Host "✅ .env file created at $envFilePath" -ForegroundColor Green
    Write-Host "⚠️ IMPORTANT: Please edit the .env file with your OpenAI API credentials" -ForegroundColor Yellow
}

# Install all dependencies
Write-Host "Installing all dependencies..." -ForegroundColor Cyan
npm run install:all
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ All dependencies installed" -ForegroundColor Green

# Start application in development mode
Write-Host "Starting application in development mode..." -ForegroundColor Cyan
npm run start:all
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start application" -ForegroundColor Red
    exit 1
}

Write-Host "✨ EpicReuse is now running!" -ForegroundColor Green
