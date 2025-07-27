import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import codeGenerationRoutes from './routes/codeGeneration';
import { CodeGenerationController } from './controllers/codeGenerationController';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Check if environment variables are set
const requiredEnvVars = [
  'OPENAI_API_BASE',
  'OPENAI_DEPLOYMENT_NAME',
  'OPENAI_API_VERSION',
  'OPENAI_API_KEY'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.warn(`Missing environment variables: ${missingEnvVars.join(', ')}`);
  console.warn('Please create a .env file with these variables');
}

// Create a .env file if it doesn't exist
const envFilePath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envFilePath)) {
  const envTemplate = `
# OpenAI API Configuration
OPENAI_API_BASE=https://your-openai-endpoint.openai.azure.com
OPENAI_DEPLOYMENT_NAME=your-deployment-name
OPENAI_API_VERSION=2023-05-15
OPENAI_API_KEY=your-api-key

# Server Configuration
PORT=5000
  `.trim();
  
  fs.writeFileSync(envFilePath, envTemplate);
  console.log(`Created template .env file at ${envFilePath}`);
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Routes
app.use('/api', codeGenerationRoutes);

// For backward compatibility, redirect /html to /api/generate
app.post('/html', async (req, res) => {
  console.log('Redirecting from /html to /api/generate');
  
  try {
    // Forward the request to the controller directly
    const controller = new CodeGenerationController();
    await controller.generateCode(req, res);
  } catch (error) {
    console.error('Error handling legacy /html endpoint:', error);
    res.status(500).json({ error: 'Server error', details: 'Error processing request' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});