import express from 'express';
import multer from 'multer';
import { CodeGenerationController } from '../controllers/codeGenerationController';

const router = express.Router();
const upload = multer();
const codeGenerationController = new CodeGenerationController();

// Route for code generation from HTML
router.post('/generate', 
  upload.single('file'), 
  codeGenerationController.generateCode
);

export default router;
