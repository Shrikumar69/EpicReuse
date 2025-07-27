# EpicReuse

A specialized tool for generating reusable functions for ERP automation from HTML code.

## Overview

EpicReuse helps ERP automation engineers by automatically generating reusable functions based on HTML content. It uses:

- Your existing reusable functions as templates
- Your Page Object Models (POMs) for selector strategies
- AI-powered code generation to produce precisely formatted code

## Features

- 🧩 Generate precise, ready-to-use automation functions
- 📋 Paste HTML directly or upload HTML files
- 🔄 Use existing reusable functions and POMs as reference
- 📂 Customize paths to your reference code
- 🧠 AI-powered analysis to match your coding patterns

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)
- OpenAI API credentials (Azure OpenAI Service)

### Quick Start

Run the included PowerShell script to set up and start both the backend and frontend:

```powershell
.\start.ps1
```

This will:
1. Create a template `.env` file if needed
2. Install dependencies for both frontend and backend
3. Build the frontend and backend
4. Start both the backend and frontend servers

### Alternative Setup

You can also use npm scripts to manage the application:

```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all

# Start both frontend and backend in development mode
npm run start:all

# Start only the frontend
npm start

# Start only the backend
npm run start:backend

# Build the application for production
npm run build
```

## Usage

1. Enter or upload HTML code from your ERP application
2. (Optional) Customize paths to your reusable functions and POM files
3. Click "Generate" to produce reusable automation functions
4. Copy the generated code to use in your automation project

## File Structure

```
EpicReuse/
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helper functions
│   │   └── index.ts         # Main server file
│   ├── .env                 # Environment variables
│   └── package.json         # Backend dependencies
├── frontend/                # React frontend
│   ├── public/              # Static files
│   ├── src/                 # React components
│   └── package.json         # Frontend dependencies
├── start.ps1                # Setup and run script
└── README.md                # Project documentation
```

## Notes

- The default paths for reference code are:
  - Reusable Functions: `C:/CSF/erp-apps-aut/projects/workflows/src/CSF/ReusableFunctions`
  - POM Files: `C:/CSF/erp-apps-aut/projects/ui/src/UIApps`
- You can customize these paths in the application UI

## License

This project is licensed under the ISC License.
