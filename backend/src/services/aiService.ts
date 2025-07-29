import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: {
    message?: {
      content: string;
    };
    finish_reason?: string;
  }[];
}

export class AIService {
  private apiBase: string;
  private deploymentName: string;
  private apiVersion: string;
  private apiKey: string;
  private readonly cacheDir: string;
  
  constructor() {
    this.apiBase = process.env.OPENAI_API_BASE || '';
    this.deploymentName = process.env.OPENAI_DEPLOYMENT_NAME || '';
    this.apiVersion = process.env.OPENAI_API_VERSION || '';
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.cacheDir = path.join(__dirname, '../../uploads/cache');
    
    // Create cache directory if it doesn't exist
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
    
    if (!this.apiBase || !this.deploymentName || !this.apiVersion || !this.apiKey) {
      console.error('Missing OpenAI environment variables');
    }
  }
  
  /**
   * Validates that all required environment variables are set
   */
  public validateConfig(): boolean {
    return !!(this.apiBase && this.deploymentName && this.apiVersion && this.apiKey);
  }
  
  /**
   * Generates code based on HTML, reusable functions, and POM files
   * @param html HTML content
   * @param reusableFunctions Example reusable functions
   * @param pomExamples Example POM files
   * @returns Generated code as a string
   */
  public async generateCode(
    html: string, 
    reusableFunctions: Record<string, string>,
    pomExamples: Record<string, string>
  ): Promise<string> {
    if (!this.validateConfig()) {
      throw new Error('OpenAI API not properly configured');
    }
    
    // Create a cache key based on the input
    const cacheKey = Buffer.from(html.slice(0, 200) + Object.keys(reusableFunctions).join('')).toString('base64')
      .replace(/[/\\?%*:|"<>]/g, '_');
    const cachePath = path.join(this.cacheDir, `${cacheKey}.json`);
    
    // Check cache
    if (fs.existsSync(cachePath)) {
      try {
        const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        if (cacheData.timestamp > Date.now() - 24 * 60 * 60 * 1000) { // 24 hour cache
          console.log('Using cached response');
          return cacheData.result;
        }
      } catch (error) {
        console.warn('Error reading cache:', error);
        // Continue with API call if cache read fails
      }
    }
    
    // Select the most relevant reusable functions (prioritize helpers, common utils)
    const priorityFunctions = Object.entries(reusableFunctions)
      .filter(([filename]) => {
        const lowercaseName = filename.toLowerCase();
        return lowercaseName.includes('helper') || 
               lowercaseName.includes('util') || 
               lowercaseName.includes('common') ||
               lowercaseName.includes('funcs');
      });
    
    // If we have priority functions, use those, otherwise use all
    const selectedFunctions = priorityFunctions.length > 0 ? 
      Object.fromEntries(priorityFunctions) : reusableFunctions;
    
    // Create a consolidated string of reusable function examples
    const reusableFuncExampleStr = Object.entries(selectedFunctions)
      .map(([filename, content]) => `// FILE: ${filename}\n${content}\n\n`)
      .join('\n');
      
    // Create a consolidated string of POM examples
    const pomExamplesStr = Object.entries(pomExamples)
      .map(([filename, content]) => `// FILE: ${filename}\n${content}\n\n`)
      .join('\n');
      
    // Extract important HTML elements for the prompt
    const idMatches = html.match(/id=["']([^"']+)["']/g) || [];
    const epguidMatches = html.match(/epguid=["']([^"']+)["']/g) || [];
    const nameMatches = html.match(/name=["']([^"']+)["']/g) || [];
    
    // Create a summary of HTML elements for the prompt
    const htmlSummary = `
HTML Summary:
- IDs: ${idMatches.slice(0, 20).join(', ')}${idMatches.length > 20 ? '...' : ''}
- EPGUIDs: ${epguidMatches.slice(0, 20).join(', ')}${epguidMatches.length > 20 ? '...' : ''}
- Names: ${nameMatches.slice(0, 20).join(', ')}${nameMatches.length > 20 ? '...' : ''}
`;
    
    // Create an enhanced system prompt
    const systemPrompt = `You are an expert automation engineer specializing in reusable function creation for ERP automation. Your task is to analyze HTML and generate TypeScript automation functions by EXACTLY copying the patterns, naming conventions, code style, and selector strategies found in the provided examples.

Key requirements:
1. Analyze the HTML structure focusing on form elements, buttons, tables, and key UI components
2. Generate a helper class that EXACTLY matches the code style, formatting, and patterns from the examples
3. Use the EXACT SAME selector strategies (epguid, id, xpath) and variable declaration style as in the example files
4. Copy the EXACT import statements from the examples, using the same relative path structure
5. Use IDENTICAL method signatures, error handling patterns with try/catch blocks, and logging approaches
6. Follow the EXACT same TypeScript type annotations, spacing, indentation, and code organization
7. The result must be indistinguishable from code written by the same developer who wrote the examples
8. When files have import statements, DO NOT MODIFY these paths - keep them EXACTLY as they appear in the examples

DO NOT under any circumstances:
- Invent new patterns, method structures, or approaches not seen in the examples
- Change the coding style, error handling pattern, or logging approaches even slightly
- Add any comments, explanations or documentation that don't match the style in the examples
- Use any frameworks, libraries, or imports not shown in the examples
- Create methods that don't follow the exact same structure as those in the examples
- Modify import paths from the examples - even if they seem wrong, KEEP THEM AS IS

Your output must be ONLY the complete TypeScript file with no explanations, matching the examples down to the smallest details of syntax, spacing, and code organization.`;

    // Create an enhanced user prompt
    const userPrompt = `
I need you to generate reusable functions for automating an ERP interface by exactly duplicating the code structure, style, patterns, and approach from the examples. Your generated code must be indistinguishable from the example code as if written by the same developer.

${htmlSummary}

Here's the HTML to analyze and generate automation functions for:
\`\`\`html
${html}
\`\`\`

Below are examples of existing reusable functions that you MUST copy the exact style, structure, and patterns from:
\`\`\`typescript
${reusableFuncExampleStr}
\`\`\`

Below are examples of Page Object Models (POMs) that show the selector strategies to use:
\`\`\`typescript
${pomExamplesStr}
\`\`\`

CRITICAL INSTRUCTIONS - FOLLOW EXACTLY:
1. The code MUST look IDENTICAL in structure to the examples above
2. Use the EXACT SAME import statements and relative paths seen in the examples - DO NOT MODIFY THESE PATHS AT ALL
3. Use the EXACT SAME constructor signature seen in the reusable functions
4. Use the EXACT SAME selector approach (id, epguid, xpath) in the EXACT SAME format as the examples
5. Create methods that follow the IDENTICAL pattern:
   - Same method signatures (parameter order and types)
   - Same logging/console statements at the beginning, during, and end of methods
   - Same error handling with identical try/catch blocks and error logging
6. Match the exact spacing, indentation, and code formatting
7. Use the same naming conventions for variables, methods, and classes
8. DO NOT change any import paths in the examples - keep them EXACTLY as they are given in the examples

Your output MUST BE INDISTINGUISHABLE from the example code as if written by the same developer.
DO NOT add any explanations, comments, or text that isn't in the same style as the examples.
Your output must be the COMPLETE TYPESCRIPT CLASS only, with no additional text before or after.
`;

    try {
      // Make the API call with enhanced settings
      const response = await axios.post<OpenAIResponse>(
        `${this.apiBase}/openai/deployments/${this.deploymentName}/chat/completions?api-version=${this.apiVersion}`,
        {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.01,     // Extremely low temperature for exact pattern matching
          max_tokens: 4096,      // Increased token limit for more detailed responses
          top_p: 0.99,           // Very high top_p for more deterministic outputs
          frequency_penalty: 0.0, // No frequency penalty to allow repetition of patterns
          presence_penalty: 0.0,  // No presence penalty to allow consistent style
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': this.apiKey
          }
        }
      );
      
      // Check if the response was completed or cut off
      const result = response.data.choices[0].message?.content || '';
      const finishReason = response.data.choices[0].finish_reason;
      
      // Clean up the result - remove markdown code block syntax if present
      let finalResult = result;
      if (result.startsWith('```typescript')) {
        finalResult = result.replace(/^```typescript\n/, '').replace(/```$/, '');
      } else if (result.startsWith('```')) {
        finalResult = result.replace(/^```\n/, '').replace(/```$/, '');
      }
      
      // If the response was cut off, add a note
      if (finishReason === 'length') {
        finalResult += '\n\n// Note: The generated code was truncated due to length limits. Please review and complete any unfinished parts.';
      }
      
      // Cache the result
      try {
        fs.writeFileSync(cachePath, JSON.stringify({
          result: finalResult,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.warn('Error writing to cache:', error);
      }
      
      return finalResult;
    } catch (error: any) {
      console.error('Error calling OpenAI API:', error.response?.data || error.message);
      
      // Try to extract more detailed error info
      const errorDetails = error.response?.data?.error?.message || error.message;
      throw new Error(`OpenAI API error: ${errorDetails}`);
    }
  }
}
