import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { AIService } from '../services/aiService';
import { processHtmlForAnalysis, readFileWithTruncation, readFilesWithExtension } from '../utils/fileProcessor';

interface CodeGenerationRequest {
  html?: string;
  file?: Express.Multer.File;
  reusableFunctionPath?: string;
  pomPath?: string;
  formName?: string;
}

export class CodeGenerationController {
  private aiService: AIService;
  private uploadsDir: string;
  
  constructor() {
    this.aiService = new AIService();
    this.uploadsDir = path.join(__dirname, '../../uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }
  
  /**
   * Handle code generation request
   */
  public generateCode = async (req: Request, res: Response): Promise<void> => {
    const startTime = Date.now();
    console.log('Received code generation request');
    
    try {
      // Extract HTML from request
      let htmlRaw = '';
      
      if (req.file) {
        console.log(`Processing uploaded file: ${req.file.originalname || 'unnamed'}`);
        htmlRaw = req.file.buffer.toString();
        
        // Save the uploaded file for debugging
        const filePath = path.join(this.uploadsDir, `${Date.now()}_${req.file.originalname || 'unnamed'}`);
        fs.writeFileSync(filePath, htmlRaw);
        console.log(`Saved uploaded file to ${filePath}`);
      } else if (req.body.html) {
        console.log('Processing HTML from request body');
        htmlRaw = req.body.html;
        
        // Save the HTML for debugging
        const filePath = path.join(this.uploadsDir, `${Date.now()}_html_input.txt`);
        fs.writeFileSync(filePath, htmlRaw);
        console.log(`Saved HTML input to ${filePath}`);
      } else {
        res.status(400).json({ 
          error: 'No HTML provided',
          message: 'Please provide HTML content either as a file upload or in the request body'
        });
        return;
      }
      
      // Process HTML
      console.log('Processing HTML for analysis');
      const html = processHtmlForAnalysis(htmlRaw);
      
      // Define paths for reusable functions and POMs
      // Use custom paths if provided, otherwise use defaults
      let reusableFunctionPath = req.body.reusableFunctionPath || 
        'C:/CSF/erp-apps-aut/projects/workflows/src/CSF/ReusableFunctions';
      
      let pomPath = req.body.pomPath || 
        'C:/CSF/erp-apps-aut/projects/ui/src/UIApps';
        
      // Convert backslashes to forward slashes for consistency
      reusableFunctionPath = reusableFunctionPath.replace(/\\/g, '/');
      pomPath = pomPath.replace(/\\/g, '/');
      
      // Get form name if provided
      const formName = req.body.formName || '';
      
      console.log(`Using reusable function path: ${reusableFunctionPath}`);
      console.log(`Using POM path: ${pomPath}`);
      if (formName) {
        console.log(`Using form name filter: ${formName}`);
      }
      
      // Get reusable functions
      let reusableFunctions: Record<string, string> = {};
      let useBuiltInExamples = false;
      
      try {
        if (fs.existsSync(reusableFunctionPath)) {
          console.log(`Reading reusable functions from path: ${reusableFunctionPath}`);
          // Verify directory contents
          try {
            const dirItems = fs.readdirSync(reusableFunctionPath);
            console.log(`Directory ${reusableFunctionPath} contains ${dirItems.length} items: ${dirItems.join(', ')}`);
          } catch (dirErr) {
            console.error(`Error listing directory contents: ${(dirErr as Error).message}`);
            console.log('Will fallback to built-in examples');
            useBuiltInExamples = true;
          }
          
          if (!useBuiltInExamples) {
            reusableFunctions = readFilesWithExtension(reusableFunctionPath, '.ts', 5, formName);
            
            // Check if we found any reusable functions
            if (Object.keys(reusableFunctions).length === 0) {
              console.warn(`No matching reusable functions found at path: ${reusableFunctionPath} with form name: ${formName || 'none'}`);
              console.log('Will fallback to built-in examples');
              useBuiltInExamples = true;
            }
          }
        } else {
          console.warn(`Reusable function path doesn't exist: ${reusableFunctionPath}`);
          console.log('Will fallback to built-in examples');
          useBuiltInExamples = true;
        }
        
        // If no custom files were found, use built-in examples
        if (useBuiltInExamples) {
          const examplesPath = path.join(__dirname, '../examples/reusableFunctions');
          console.log(`Using built-in examples from: ${examplesPath}`);
          reusableFunctions = readFilesWithExtension(examplesPath, '.ts', 5);
          if (Object.keys(reusableFunctions).length === 0) {
            throw new Error('No built-in examples found');
          }
        }
      } catch (error) {
        console.error('Error accessing reusable functions:', error);
        res.status(500).json({
          error: 'Function access error',
          message: `Error accessing reusable functions: ${(error as Error).message}`
        });
        return;
      }
      
      // Get POM examples
      let pomExamples: Record<string, string> = {};
      useBuiltInExamples = false;
      
      try {
        if (fs.existsSync(pomPath)) {
          console.log(`Reading POM examples from path: ${pomPath}`);
          // Verify directory contents
          try {
            const dirItems = fs.readdirSync(pomPath);
            console.log(`Directory ${pomPath} contains ${dirItems.length} items: ${dirItems.join(', ')}`);
          } catch (dirErr) {
            console.error(`Error listing directory contents: ${(dirErr as Error).message}`);
            console.log('Will fallback to built-in examples');
            useBuiltInExamples = true;
          }
          
          if (!useBuiltInExamples) {
            pomExamples = readFilesWithExtension(pomPath, '.ts', 5, formName);
            
            // Check if we found any POM examples
            if (Object.keys(pomExamples).length === 0) {
              console.warn(`No matching POM examples found at path: ${pomPath} with form name: ${formName || 'none'}`);
              console.log('Will fallback to built-in examples');
              useBuiltInExamples = true;
            }
          }
        } else {
          console.warn(`POM directory not found at ${pomPath}`);
          console.log('Will fallback to built-in examples');
          useBuiltInExamples = true;
        }
        
        // If no custom files were found, use built-in examples
        if (useBuiltInExamples) {
          const examplesPath = path.join(__dirname, '../examples/poms');
          console.log(`Using built-in examples from: ${examplesPath}`);
          pomExamples = readFilesWithExtension(examplesPath, '.ts', 5);
          if (Object.keys(pomExamples).length === 0) {
            throw new Error('No built-in examples found');
          }
        }
      } catch (error) {
        console.error('Error accessing POM examples:', error);
        res.status(500).json({
          error: 'POM access error',
          message: `Error accessing POM examples: ${(error as Error).message}`
        });
        return;
      }
      
      // Generate code
      console.log('Generating code with AI service...');
      const generatedCode = await this.aiService.generateCode(html, reusableFunctions, pomExamples);
      
      // Save the generated code for debugging
      const resultPath = path.join(this.uploadsDir, `${Date.now()}_generated_code.ts`);
      fs.writeFileSync(resultPath, generatedCode);
      console.log(`Saved generated code to ${resultPath}`);
      
      // Calculate execution time
      const executionTime = Date.now() - startTime;
      console.log(`Code generation completed in ${executionTime}ms`);
      
      // Send response
      res.json({ 
        result: generatedCode,
        metadata: {
          reusableFunctionCount: Object.keys(reusableFunctions).length,
          pomExamplesCount: Object.keys(pomExamples).length,
          htmlLength: html.length,
          executionTimeMs: executionTime
        }
      });
    } catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }
      
      console.error('Error in code generation:', error);
      res.status(500).json({ 
        error: 'Code generation error', 
        details: message,
        message: 'There was an error generating the code. Please try again with a different HTML input or check the server logs.'
      });
    }
  };
}
