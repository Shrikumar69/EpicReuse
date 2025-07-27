```typescript
import { WebElementWrapper, WebDriverWrapper } from '@utils/selenium-wrappers';
import { ITestLogger } from '@utils/logger';

export class ReceiptHelper {
  constructor(
    private driver: WebDriverWrapper,
    private logger: ITestLogger
  ) {}

  /**
   * Gets the page title from the Receipts view
   */
  async getPageTitle(): Promise<string> {
    this.logger.info('Getting Receipts page title');
    try {
      const titleElement = await this.driver.findElement({ id: 'ep-view-title' });
      const title = await titleElement.getText();
      this.logger.info(`Receipts page title: "${title}"`);
      return title;
    } catch (error) {
      this.logger.error('Error getting Receipts page title', error);
      throw error;
    }
  }

  /**
   * Gets the subtitle text from the Receipts view
   */
  async getPageSubtitle(): Promise<string> {
    this.logger.info('Getting Receipts page subtitle');
    try {
      const subtitleElement = await this.driver.findElement({ id: 'ep-view-subtitles' });
      const subtitle = await subtitleElement.getText();
      this.logger.info(`Receipts page subtitle: "${subtitle}"`);
      return subtitle;
    } catch (error) {
      this.logger.error('Error getting Receipts page subtitle', error);
      throw error;
    }
  }

  /**
   * Clicks the Search action button in the Receipts header
   */
  async clickSearchAction(): Promise<void> {
    this.logger.info('Clicking Search action button');
    try {
      const searchButton = await this.driver.findElement({
        xpath: '//div[@id="ep-actions-button"]/i[contains(@class,"mdi-magnify")]'
      });
      await searchButton.click();
      this.logger.info('Search action button clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Search action button', error);
      throw error;
    }
  }

  /**
   * Clicks the New Receipt action button in the Receipts header
   */
  async clickNewReceiptAction(): Promise<void> {
    this.logger.info('Clicking New Receipt action button');
    try {
      const newReceiptButton = await this.driver.findElement({
        xpath: '//div[@id="ep-actions-button"]/i[contains(@class,"mdi-plus-circle-outline")]'
      });
      await newReceiptButton.click();
      this.logger.info('New Receipt action button clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking New Receipt action button', error);
      throw error;
    }
  }

  /**
   * Clicks the Add Intercompany Receipt action button in the Receipts header
   */
  async clickAddIntercompanyReceiptAction(): Promise<void> {
    this.logger.info('Clicking Add Intercompany Receipt action button');
    try {
      const addIntercompanyButton = await this.driver.findElement({
        xpath: '//div[@id="ep-actions-button"]/i[contains(@class,"mdi-factory")]'
      });
      await addIntercompanyButton.click();
      this.logger.info('Add Intercompany Receipt action button clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Add Intercompany Receipt action button', error);
      throw error;
    }
  }

  /**
   * Clicks the dropdown button in the Receipts header
   */
  async clickHeaderDropdown(): Promise<void> {
    this.logger.info('Clicking header dropdown button');
    try {
      const dropdownButton = await this.driver.findElement({ id: 'e17f2c5f-41c8-479a-9ae3-9dfdef51965b' });
      await dropdownButton.click();
      this.logger.info('Header dropdown button clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking header dropdown button', error);
      throw error;
    }
  }

  /**
   * Fills the Pack Slip input field on the landing page
   * @param packSlip The pack slip value to enter
   */
  async fillPackSlip(packSlip: string): Promise<void> {
    this.logger.info(`Filling Pack Slip field with value "${packSlip}"`);
    try {
      const packSlipField = await this.driver.findElement({ id: 'txtLandingPagePackSlip' });
      await packSlipField.clear();
      await packSlipField.sendKeys(packSlip);
      this.logger.info('Pack Slip field filled successfully');
    } catch (error) {
      this.logger.error('Error filling Pack Slip field', error);
      throw error;
    }
  }

  /**
   * Clicks the search icon next to the Pack Slip input field
   */
  async clickPackSlipSearchIcon(): Promise<void> {
    this.logger.info('Clicking Pack Slip search icon');
    try {
      const searchIcon = await this.driver.findElement({ id: 'epSearchIcon' });
      await searchIcon.click();
      this.logger.info('Pack Slip search icon clicked successfully');
    } catch (error) {
      this.logger.error('Error clicking Pack Slip search icon', error);
      throw error;
    }
  }

  /**
   * Gets the grid header title text from the Receipts grid
   */
  async getGridHeaderTitle(): Promise<string> {
    this.logger.info('Getting grid header title');
    try {
      const gridHeader = await this.driver.findElement({ id: 'gridHeaderTitle' });
      const headerText = await gridHeader.getText();
      this.logger.info(`Grid header title: "${headerText}"`);
      return headerText;
    } catch (error) {
      this.logger.error('Error getting grid header title', error);
      throw error;
    }
  }

  /**
   * Waits for the Receipts grid to be visible
   */
  async waitForReceiptsGrid(): Promise<void> {
    this.logger.info('Waiting for Receipts grid to be visible');
    try {
      await this.driver.waitForElement({ id: 'EpGrid525' });
      this.logger.info('Receipts grid is visible');
    } catch (error) {
      this.logger.error('Error waiting for Receipts grid', error);
      throw error;
    }
  }
}
```