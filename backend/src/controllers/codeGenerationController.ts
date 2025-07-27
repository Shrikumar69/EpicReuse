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
      const reusableFunctionPath = req.body.reusableFunctionPath || 
        path.join(__dirname, '../../src/examples/reusableFunctions');
      
      const pomPath = req.body.pomPath || 
        path.join(__dirname, '../../src/examples/poms');
      
      // Get form name if provided
      const formName = req.body.formName || '';
      
      console.log(`Using reusable function path: ${reusableFunctionPath}`);
      console.log(`Using POM path: ${pomPath}`);
      if (formName) {
        console.log(`Using form name filter: ${formName}`);
      }
      
      // Get reusable functions
      let reusableFunctions: Record<string, string> = {};
      try {
        if (fs.existsSync(reusableFunctionPath)) {
          console.log('Reading reusable functions from provided path');
          reusableFunctions = readFilesWithExtension(reusableFunctionPath, '.ts', 5, formName);
          
          // Check if we found any reusable functions
          if (Object.keys(reusableFunctions).length === 0) {
            console.warn('No matching reusable functions found at the provided path');
            console.log('Using fallback sample reusable functions');
            throw new Error('No matching reusable functions found');
          }
        } else {
          console.warn(`Reusable function path doesn't exist: ${reusableFunctionPath}`);
          console.log('Using fallback sample reusable functions');
          throw new Error('Reusable function path does not exist');
        }
      } catch (error) {
        console.log('Using built-in example reusable functions');
        
        // Multiple example files for better context
        reusableFunctions['APInvoiceHelper.funcs.ts'] = `
// Sample reusable function for AP Invoice processing
import { WebElementWrapper, WebDriverWrapper } from '@utils/selenium-wrappers';
import { ITestLogger } from '@utils/logger';

export class APInvoiceHelper {
  constructor(
    private driver: WebDriverWrapper,
    private logger: ITestLogger
  ) {}

  /**
   * Fills in the invoice header information
   * @param invoiceNumber The invoice number to enter
   * @param vendorId The vendor ID
   * @param amount The invoice amount
   */
  async fillInvoiceHeader(invoiceNumber: string, vendorId: string, amount: string): Promise<void> {
    this.logger.info('Filling invoice header information');
    try {
      // Enter invoice number
      const invoiceNumberField = await this.driver.findElement({ epguid: 'invoice-number-field' });
      await invoiceNumberField.sendKeys(invoiceNumber);
      
      // Enter vendor ID
      const vendorField = await this.driver.findElement({ epguid: 'vendor-id-field' });
      await vendorField.sendKeys(vendorId);
      
      // Enter amount
      const amountField = await this.driver.findElement({ epguid: 'amount-field' });
      await amountField.sendKeys(amount);
      
      this.logger.info('Invoice header information filled successfully');
    } catch (error) {
      this.logger.error('Error filling invoice header information', error);
      throw error;
    }
  }

  /**
   * Adds a line item to the invoice
   * @param itemNumber The item number
   * @param description The item description
   * @param quantity The quantity
   * @param price The price per unit
   */
  async addLineItem(itemNumber: string, description: string, quantity: string, price: string): Promise<void> {
    this.logger.info('Adding line item to invoice');
    try {
      // Click add line button
      const addLineButton = await this.driver.findElement({ epguid: 'add-line-button' });
      await addLineButton.click();
      
      // Wait for line item form to appear
      await this.driver.waitForElement({ id: 'line-item-form' });
      
      // Fill in the line item details
      const itemNumberField = await this.driver.findElement({ id: 'item-number-field' });
      await itemNumberField.sendKeys(itemNumber);
      
      const descriptionField = await this.driver.findElement({ xpath: '//input[@placeholder="Description"]' });
      await descriptionField.sendKeys(description);
      
      const quantityField = await this.driver.findElement({ id: 'quantity-field' });
      await quantityField.sendKeys(quantity);
      
      const priceField = await this.driver.findElement({ id: 'price-field' });
      await priceField.sendKeys(price);
      
      // Save the line item
      const saveButton = await this.driver.findElement({ xpath: '//button[contains(text(), "Save")]' });
      await saveButton.click();
      
      this.logger.info('Line item added successfully');
    } catch (error) {
      this.logger.error('Error adding line item to invoice', error);
      throw error;
    }
  }
  
  /**
   * Submits the invoice for approval
   */
  async submitInvoice(): Promise<void> {
    this.logger.info('Submitting invoice for approval');
    try {
      const submitButton = await this.driver.findElement({ epguid: 'submit-invoice-button' });
      await submitButton.click();
      
      // Wait for confirmation dialog
      await this.driver.waitForElement({ id: 'confirmation-dialog' });
      
      // Confirm submission
      const confirmButton = await this.driver.findElement({ xpath: '//button[contains(text(), "Confirm")]' });
      await confirmButton.click();
      
      // Wait for success message
      await this.driver.waitForElement({ xpath: '//div[contains(text(), "Invoice submitted successfully")]' });
      
      this.logger.info('Invoice submitted successfully');
    } catch (error) {
      this.logger.error('Error submitting invoice', error);
      throw error;
    }
  }
}`;

        reusableFunctions['FormHelper.funcs.ts'] = `
// Sample reusable function for general form handling
import { WebElementWrapper, WebDriverWrapper } from '@utils/selenium-wrappers';
import { ITestLogger } from '@utils/logger';

export class FormHelper {
  constructor(
    private driver: WebDriverWrapper,
    private logger: ITestLogger
  ) {}

  /**
   * Fills a form field by label
   * @param label The label text of the field
   * @param value The value to enter
   */
  async fillFieldByLabel(label: string, value: string): Promise<void> {
    this.logger.info(\`Filling field "\${label}" with value "\${value}"\`);
    try {
      const labelElement = await this.driver.findElement(\`//label[contains(text(), "\${label}")]\`);
      const id = await labelElement.getAttribute('for');
      const input = await this.driver.findElement(\`//input[@id="\${id}"]\`);
      await input.sendKeys(value);
      this.logger.info(\`Field "\${label}" filled successfully\`);
    } catch (error) {
      this.logger.error(\`Error filling field "\${label}"\`, error);
      throw error;
    }
  }

  /**
   * Selects an option from a dropdown by label
   * @param label The label text of the dropdown
   * @param optionText The text of the option to select
   */
  async selectOptionByLabel(label: string, optionText: string): Promise<void> {
    this.logger.info(\`Selecting option "\${optionText}" from dropdown "\${label}"\`);
    try {
      const labelElement = await this.driver.findElement(\`//label[contains(text(), "\${label}")]\`);
      const id = await labelElement.getAttribute('for');
      const select = await this.driver.findElement(\`//select[@id="\${id}"]\`);
      await select.click();
      
      const option = await this.driver.findElement(\`//option[text()="\${optionText}"]\`);
      await option.click();
      
      this.logger.info(\`Option "\${optionText}" selected successfully from dropdown "\${label}"\`);
    } catch (error) {
      this.logger.error(\`Error selecting option "\${optionText}" from dropdown "\${label}"\`, error);
      throw error;
    }
  }

  /**
   * Clicks a button by text
   * @param buttonText The text of the button to click
   */
  async clickButtonByText(buttonText: string): Promise<void> {
    this.logger.info(\`Clicking button "\${buttonText}"\`);
    try {
      const button = await this.driver.findElement(\`//button[contains(text(), "\${buttonText}")]\`);
      await button.click();
      this.logger.info(\`Button "\${buttonText}" clicked successfully\`);
    } catch (error) {
      this.logger.error(\`Error clicking button "\${buttonText}"\`, error);
      throw error;
    }
  }
}`;
      }
      
      // Get POM examples
      let pomExamples: Record<string, string> = {};
      try {
        if (fs.existsSync(pomPath)) {
          console.log('Reading POM examples from provided path');
          pomExamples = readFilesWithExtension(pomPath, '.po.ts', 5, formName);
          
          // Check if we found any POM examples
          if (Object.keys(pomExamples).length === 0) {
            console.warn('No matching POM examples found at the provided path');
            console.log('Using fallback sample POM');
            throw new Error('No matching POM examples found');
          }
        } else {
          console.warn(`POM directory not found at ${pomPath}`);
          console.log('Using fallback sample POM');
          throw new Error('POM directory does not exist');
        }
      } catch (error) {
        console.log('Using built-in example POMs');
        
        pomExamples['APInvoicePage.po.ts'] = `
// Sample Page Object Model for AP Invoice page
import { WebElementWrapper, WebDriverWrapper } from '@utils/selenium-wrappers';
import { ITestLogger } from '@utils/logger';

export class APInvoicePagePO {
  // Header selectors
  private readonly pageTitle = { epguid: 'ap-invoice-title' };
  private readonly saveButton = { id: 'save-button' };
  private readonly submitButton = { epguid: 'submit-invoice-button' };
  private readonly cancelButton = { xpath: '//button[contains(text(), "Cancel")]' };
  
  // Invoice header selectors
  private readonly invoiceNumberField = { epguid: 'invoice-number-field' };
  private readonly vendorField = { id: 'vendor-id-field' };
  private readonly amountField = { epguid: 'amount-field' };
  private readonly dateField = { id: 'invoice-date-field' };
  
  // Line items selectors
  private readonly addLineButton = { epguid: 'add-line-button' };
  private readonly lineItemsTable = { id: 'line-items-table' };
  private readonly lineItemRow = (index: number) => ({ xpath: \`//table[@id="line-items-table"]/tbody/tr[\${index}]\` });
  private readonly itemNumberField = { id: 'item-number-field' };
  private readonly descriptionField = { xpath: '//input[@placeholder="Description"]' };
  private readonly quantityField = { id: 'quantity-field' };
  private readonly priceField = { id: 'price-field' };
  
  constructor(
    private driver: WebDriverWrapper,
    private logger: ITestLogger
  ) {}
  
  async getPageTitle(): Promise<string> {
    const element = await this.driver.findElement(this.pageTitle);
    return element.getText();
  }
  
  async enterInvoiceNumber(invoiceNumber: string): Promise<void> {
    const element = await this.driver.findElement(this.invoiceNumberField);
    await element.sendKeys(invoiceNumber);
  }
  
  async enterVendorId(vendorId: string): Promise<void> {
    const element = await this.driver.findElement(this.vendorField);
    await element.sendKeys(vendorId);
  }
  
  async enterAmount(amount: string): Promise<void> {
    const element = await this.driver.findElement(this.amountField);
    await element.sendKeys(amount);
  }
  
  async enterDate(date: string): Promise<void> {
    const element = await this.driver.findElement(this.dateField);
    await element.sendKeys(date);
  }
  
  async clickAddLine(): Promise<void> {
    const element = await this.driver.findElement(this.addLineButton);
    await element.click();
  }
  
  async clickSave(): Promise<void> {
    const element = await this.driver.findElement(this.saveButton);
    await element.click();
  }
  
  async clickSubmit(): Promise<void> {
    const element = await this.driver.findElement(this.submitButton);
    await element.click();
  }
  
  async clickCancel(): Promise<void> {
    const element = await this.driver.findElement(this.cancelButton);
    await element.click();
  }
  
  async getLineItemsCount(): Promise<number> {
    const table = await this.driver.findElement(this.lineItemsTable);
    const rows = await table.findElements({ xpath: './tbody/tr' });
    return rows.length;
  }
}`;
      }
      
      // Validate we have enough examples and use fallback if needed
      if (Object.keys(reusableFunctions).length === 0) {
        // Use default examples instead of returning error
        console.warn('No reusable function examples found, using default examples');
        
        // Add a simple default example
        reusableFunctions['DefaultFormHelper.funcs.ts'] = fs.readFileSync(
          path.join(__dirname, '../../src/examples/reusableFunctions/FormHelper.funcs.ts'), 
          'utf-8'
        );
      }
      
      if (Object.keys(pomExamples).length === 0) {
        // Use default examples instead of returning error
        console.warn('No POM examples found, using default examples');
        
        // Add a simple default example
        pomExamples['DefaultGenericForm.po.ts'] = fs.readFileSync(
          path.join(__dirname, '../../src/examples/poms/GenericForm.po.ts'), 
          'utf-8'
        );
      }
      
      // Log example counts
      console.log(`Using ${Object.keys(reusableFunctions).length} reusable function examples`);
      console.log(`Using ${Object.keys(pomExamples).length} POM examples`);
      
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
