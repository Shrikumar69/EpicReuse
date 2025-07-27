```typescript
// FILE: ReceiptHelper.funcs.ts

import { WebElementWrapper, WebDriverWrapper } from '@utils/selenium-wrappers';
import { ITestLogger } from '@utils/logger';

export class ReceiptHelper {
  constructor(
    private driver: WebDriverWrapper,
    private logger: ITestLogger
  ) {}

  /**
   * Fills in the receipt header information
   * @param poNum The PO number to enter
   * @param supplierId The supplier ID
   * @param purPoint The purchase point
   * @param packSlip The packing slip number
   */
  async fillReceiptHeader(poNum: string, supplierId: string, purPoint: string, packSlip: string): Promise<void> {
    this.logger.info('Filling receipt header information');
    try {
      // Enter PO number
      const poNumField = await this.driver.findElement({ id: 'k-6db2191c-2ec8-4523-a257-64156c96a7dc' });
      await poNumField.sendKeys(poNum);

      // Enter Supplier ID
      const supplierIdField = await this.driver.findElement({ id: 'txtSupplierID' });
      await supplierIdField.sendKeys(supplierId);

      // Enter Purchase Point
      const purPointField = await this.driver.findElement({ id: 'txtPurPoint' });
      await purPointField.sendKeys(purPoint);

      // Enter Packing Slip
      const packSlipField = await this.driver.findElement({ id: 'txtKeyField' });
      await packSlipField.sendKeys(packSlip);

      this.logger.info('Receipt header information filled successfully');
    } catch (error) {
      this.logger.error('Error filling receipt header information', error);
      throw error;
    }
  }

  /**
   * Fills in import information
   * @param importNum The import number
   * @param importedFromDesc The imported from description
   */
  async fillImportInfo(importNum: string, importedFromDesc: string): Promise<void> {
    this.logger.info('Filling import information');
    try {
      const importNumField = await this.driver.findElement({ id: 'txtImportNum' });
      await importNumField.sendKeys(importNum);

      const importedFromDescField = await this.driver.findElement({ id: 'txtImportedFromDesc' });
      await importedFromDescField.sendKeys(importedFromDesc);

      this.logger.info('Import information filled successfully');
    } catch (error) {
      this.logger.error('Error filling import information', error);
      throw error;
    }
  }

  /**
   * Selects Ship Via from the combo box
   * @param shipVia The Ship Via value to select
   */
  async selectShipVia(shipVia: string): Promise<void> {
    this.logger.info(`Selecting Ship Via "${shipVia}"`);
    try {
      const comboInput = await this.driver.findElement({ id: 'k-9134cc18-0479-41f5-b093-69b8ade8fd88' });
      await comboInput.click();
      const option = await this.driver.findElement({ xpath: `//li[contains(text(), "${shipVia}")]` });
      await option.click();
      this.logger.info(`Ship Via "${shipVia}" selected successfully`);
    } catch (error) {
      this.logger.error(`Error selecting Ship Via "${shipVia}"`, error);
      throw error;
    }
  }

  /**
   * Selects Transaction Document Type from the combo box
   * @param tranDocType The Transaction Document Type to select
   */
  async selectTranDocType(tranDocType: string): Promise<void> {
    this.logger.info(`Selecting Transaction Document Type "${tranDocType}"`);
    try {
      const comboInput = await this.driver.findElement({ id: 'k-77e841b6-92e6-4f4e-bcef-227f0ef22543' });
      await comboInput.click();
      const option = await this.driver.findElement({ xpath: `//li[contains(text(), "${tranDocType}")]` });
      await option.click();
      this.logger.info(`Transaction Document Type "${tranDocType}" selected successfully`);
    } catch (error) {
      this.logger.error(`Error selecting Transaction Document Type "${tranDocType}"`, error);
      throw error;
    }
  }

  /**
   * Selects Incoterm Code from the combo box
   * @param incotermCode The Incoterm Code to select
   */
  async selectIncotermCode(incotermCode: string): Promise<void> {
    this.logger.info(`Selecting Incoterm Code "${incotermCode}"`);
    try {
      const comboInput = await this.driver.findElement({ id: 'k-c5edd6b9-69c2-4ce3-97c7-60d51fe24d64' });
      await comboInput.click();
      const option = await this.driver.findElement({ xpath: `//li[contains(text(), "${incotermCode}")]` });
      await option.click();
      this.logger.info(`Incoterm Code "${incotermCode}" selected successfully`);
    } catch (error) {
      this.logger.error(`Error selecting Incoterm Code "${incotermCode}"`, error);
      throw error;
    }
  }

  /**
   * Fills in the comments field
   * @param comments The comments to enter
   */
  async fillComments(comments: string): Promise<void> {
    this.logger.info('Filling comments');
    try {
      const commentsField = await this.driver.findElement({ id: 'txtComments' });
      await commentsField.sendKeys(comments);
      this.logger.info('Comments filled successfully');
    } catch (error) {
      this.logger.error('Error filling comments', error);
      throw error;
    }
  }

  /**
   * Clicks the Mass Receipt button
   */
  async clickMassReceipt(): Promise<void> {
    this.logger.info('Clicking Mass Receipt button');
    try {
      const massReceiptButton = await this.driver.findElement({ id: 'EpButton493' });
      await massReceiptButton.click();
      this.logger.info('Mass Receipt button clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Mass Receipt button', error);
      throw error;
    }
  }

  /**
   * Clicks the Save button in the footer
   */
  async clickSave(): Promise<void> {
    this.logger.info('Clicking Save button');
    try {
      const saveButton = await this.driver.findElement({ id: 'EpButton716' });
      await saveButton.click();
      this.logger.info('Save button clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Save button', error);
      throw error;
    }
  }

  /**
   * Clicks the New Receipt button
   */
  async clickNewReceipt(): Promise<void> {
    this.logger.info('Clicking New Receipt button');
    try {
      const newReceiptButton = await this.driver.findElement({ xpath: '//div[@id="ep-actions-button"]//i[@title="New Receipt"]' });
      await newReceiptButton.click();
      this.logger.info('New Receipt button clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking New Receipt button', error);
      throw error;
    }
  }

  /**
   * Clicks the Save icon in the header actions
   */
  async clickHeaderSave(): Promise<void> {
    this.logger.info('Clicking Save icon in header actions');
    try {
      const saveIcon = await this.driver.findElement({ xpath: '//div[@id="ep-actions-button"]//i[@title="Save"]' });
      await saveIcon.click();
      this.logger.info('Save icon clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Save icon', error);
      throw error;
    }
  }

  /**
   * Clicks the Refresh icon in the header actions
   */
  async clickHeaderRefresh(): Promise<void> {
    this.logger.info('Clicking Refresh icon in header actions');
    try {
      const refreshIcon = await this.driver.findElement({ xpath: '//div[@id="ep-actions-button"]//i[@title="Refresh"]' });
      await refreshIcon.click();
      this.logger.info('Refresh icon clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Refresh icon', error);
      throw error;
    }
  }

  /**
   * Clicks the Clear icon in the header actions
   */
  async clickHeaderClear(): Promise<void> {
    this.logger.info('Clicking Clear icon in header actions');
    try {
      const clearIcon = await this.driver.findElement({ xpath: '//div[@id="ep-actions-button"]//i[@title="Clear"]' });
      await clearIcon.click();
      this.logger.info('Clear icon clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Clear icon', error);
      throw error;
    }
  }

  /**
   * Clicks the Undo icon in the header actions
   */
  async clickHeaderUndo(): Promise<void> {
    this.logger.info('Clicking Undo icon in header actions');
    try {
      const undoIcon = await this.driver.findElement({ xpath: '//div[@id="ep-actions-button"]//i[@title="Undo"]' });
      await undoIcon.click();
      this.logger.info('Undo icon clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Undo icon', error);
      throw error;
    }
  }

  /**
   * Clicks the Search icon in the header actions
   */
  async clickHeaderSearch(): Promise<void> {
    this.logger.info('Clicking Search icon in header actions');
    try {
      const searchIcon = await this.driver.findElement({ xpath: '//div[@id="ep-actions-button"]//i[@title="Search"]' });
      await searchIcon.click();
      this.logger.info('Search icon clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Search icon', error);
      throw error;
    }
  }

  /**
   * Gets the value of the Lines Amount field
   */
  async getLinesAmount(): Promise<string> {
    this.logger.info('Getting Lines Amount value');
    try {
      const linesAmountField = await this.driver.findElement({ id: 'k-bfa72713-5440-4656-828a-47fd842b2692' });
      const value = await linesAmountField.getAttribute('value');
      this.logger.info(`Lines Amount value: ${value}`);
      return value;
    } catch (error) {
      this.logger.error('Error getting Lines Amount value', error);
      throw error;
    }
  }

  /**
   * Gets the value of the Indirect Costs field
   */
  async getIndirectCosts(): Promise<string> {
    this.logger.info('Getting Indirect Costs value');
    try {
      const indirectCostsField = await this.driver.findElement({ id: 'k-b1a8e92b-0b95-4abc-b304-6e7ac2ccadea' });
      const value = await indirectCostsField.getAttribute('value');
      this.logger.info(`Indirect Costs value: ${value}`);
      return value;
    } catch (error) {
      this.logger.error('Error getting Indirect Costs value', error);
      throw error;
    }
  }

  /**
   * Gets the value of the Duties field
   */
  async getDuties(): Promise<string> {
    this.logger.info('Getting Duties value');
    try {
      const dutiesField = await this.driver.findElement({ id: 'k-dd331bed-36d2-47ca-af8d-8a7595e52742' });
      const value = await dutiesField.getAttribute('value');
      this.logger.info(`Duties value: ${value}`);
      return value;
    } catch (error) {
      this.logger.error('Error getting Duties value', error);
      throw error;
    }
  }

  /**
   * Gets the value of the Tax field
   */
  async getTax(): Promise<string> {
    this.logger.info('Getting Tax value');
    try {
      const taxField = await this.driver.findElement({ id: 'k-321f8e2b-9f80-4087-b647-a008da8f8d8e' });
      const value = await taxField.getAttribute('value');
      this.logger.info(`Tax value: ${value}`);
      return value;
    } catch (error) {
      this.logger.error('Error getting Tax value', error);
      throw error;
    }
  }

  /**
   * Gets the value of the Total field
   */
  async getTotal(): Promise<string> {
    this.logger.info('Getting Total value');
    try {
      const totalField = await this.driver.findElement({ id: 'k-6f15b156-0eb0-41d1-804f-51db0a752165' });
      const value = await totalField.getAttribute('value');
      this.logger.info(`Total value: ${value}`);
      return value;
    } catch (error) {
      this.logger.error('Error getting Total value', error);
      throw error;
    }
  }

  /**
   * Checks the "Received All" checkbox
   */
  async checkReceivedAll(): Promise<void> {
    this.logger.info('Checking "Received All" checkbox');
    try {
      const receivedAllCheckbox = await this.driver.findElement({ id: 'EpCheckBox618' });
      const isChecked = await receivedAllCheckbox.isSelected();
      if (!isChecked) {
        await receivedAllCheckbox.click();
      }
      this.logger.info('"Received All" checkbox checked');
    } catch (error) {
      this.logger.error('Error checking "Received All" checkbox', error);
      throw error;
    }
  }

  /**
   * Gets the value of the Net Weight field
   */
  async getNetWeight(): Promise<string> {
    this.logger.info('Getting Net Weight value');
    try {
      const netWeightField = await this.driver.findElement({ id: 'k-2e560d9d-e1c3-4ddc-9b98-3255032a64e7' });
      const value = await netWeightField.getAttribute('value');
      this.logger.info(`Net Weight value: ${value}`);
      return value;
    } catch (error) {
      this.logger.error('Error getting Net Weight value', error);
      throw error;
    }
  }

  /**
   * Gets the value of the Gross Weight field
   */
  async getGrossWeight(): Promise<string> {
    this.logger.info('Getting Gross Weight value');
    try {
      const grossWeightField = await this.driver.findElement({ id: 'k-2c9068b8-77f8-4ba5-b0c1-0caebd93faec' });
      const value = await grossWeightField.getAttribute('value');
      this.logger.info(`Gross Weight value: ${value}`);
      return value;
    } catch (error) {
      this.logger.error('Error getting Gross Weight value', error);
      throw error;
    }
  }

  /**
   * Clicks the dropdown button in the Lines panel
   */
  async clickLinesDropdownButton(): Promise<void> {
    this.logger.info('Clicking Lines dropdown button');
    try {
      const dropdownButton = await this.driver.findElement({ id: '5fc4c84c-abbb-44a7-863d-5a70aff02b7e' });
      await dropdownButton.click();
      this.logger.info('Lines dropdown button clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Lines dropdown button', error);
      throw error;
    }
  }

  /**
   * Clicks the New Receipt Line icon in the Lines panel
   */
  async clickNewReceiptLine(): Promise<void> {
    this.logger.info('Clicking New Receipt Line icon');
    try {
      const newReceiptLineIcon = await this.driver.findElement({ xpath: '//div[@id="ep-actions-button"]//i[@title="New Receipt Line"]' });
      await newReceiptLineIcon.click();
      this.logger.info('New Receipt Line icon clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking New Receipt Line icon', error);
      throw error;
    }
  }
}
```