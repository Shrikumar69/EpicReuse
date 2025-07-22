import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const upload = multer();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.post('/html', upload.single('file'), async (req, res) => {
  try {
    const html = req.body.html || (req.file && req.file.buffer.toString());
    if (!html) {
      return res.status(400).json({ error: 'No HTML provided' });
    }

    // Read example reusable function file
    const reusableFuncExample = fs.readFileSync(
      'C:/CSF/erp-apps-aut/projects/workflows/src/CSF/ReusableFunctions/APInvoiceHelper.funcs.ts',
      'utf-8'
    );

    // Read all .po.ts files from your POM folder
    const pomDir = 'C:/CSF/erp-apps-aut/projects/ui/src/UIApps/Erp.UI.ReceiptEntry/page-object';
    let pomExamples = '';
    if (fs.existsSync(pomDir)) {
      const pomFiles = fs.readdirSync(pomDir).filter(f => f.endsWith('.po.ts'));
      for (const file of pomFiles) {
        const filePath = path.join(pomDir, file);
        pomExamples += `// ${file}\n` + fs.readFileSync(filePath, 'utf-8') + '\n\n';
      }
    }

    const prompt = `
Generate exact reusable functions for ERP automation by referring to:
- Existing reusable functions in this path:
  C:\\CSF\\erp-apps-aut\\projects\\workflows\\src\\CSF\\ReusableFunctions
- Existing Page Object Models (POMs) in this path:
  C:\\CSF\\erp-apps-aut\\projects\\ui\\src\\UIApps
  with all Header detials and line details

Use the provided HTML code of the ERP page as the target for automation.
Match the coding style, structure, and naming conventions found in the referenced reusable functions and POMs.
Include all necessary imports and use selectors from the relevant POM files.
Output only the new reusable function(s) in TypeScript, ready to be added to the codebase.

HTML code:
${html}

// Example Reusable Functions
${reusableFuncExample}

// Example Page Object Models
${pomExamples}
`;
console.log('Request:', {
  url: `${process.env.OPENAI_API_BASE}/openai/deployments/${process.env.OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.OPENAI_API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.OPENAI_API_KEY
  },
  body: {
    messages: [
      { role: 'system', content: 'You are a helpful assistant for code generation.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 1024
  }
});
    const response = await axios.post(
  `${process.env.OPENAI_API_BASE}/openai/deployments/${process.env.OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.OPENAI_API_VERSION}`,
  {
    messages: [
      { role: 'system', content: 'You are a helpful assistant for code generation.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 1024
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.OPENAI_API_KEY
    }
  }
);
const generatedCode = response.data.choices[0].message?.content || '';
console.log('Generated code:', generatedCode);
res.json({ result: generatedCode });
  } 
  catch (error) {
  let message = 'Unknown error';
  if (error instanceof Error) {
    message = error.message;
  }
  console.error('Error in /html:', error); 
  res.status(500).json({ error: 'OpenAI API error', details: message });
}
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});