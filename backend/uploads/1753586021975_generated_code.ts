```typescript
// FILE: LandingPageHelper.funcs.ts
import { WebElementWrapper, WebDriverWrapper } from '../../utils/selenium-wrappers';
import { ITestLogger } from '../../utils/logger';

export class LandingPageHelper {
  private readonly header = { id: 'ep-view-header' };
  private readonly title = { id: 'ep-view-title' };
  private readonly subtitles = { id: 'ep-view-subtitles' };
  private readonly actionsContainer = { id: 'EpActions431' };
  private readonly actionsButtonSearch = { xpath: '//div[@id="ep-actions-button"]/i[contains(@title, "Search")]' };
  private readonly actionsButtonNewReceipt = { xpath: '//div[@id="ep-actions-button"]/i[contains(@title, "New Receipt")]' };
  private readonly actionsButtonAddIntercompany = { xpath: '//div[@id="ep-actions-button"]/i[contains(@title, "Add Intercompany Receipt")]' };
  private readonly dropdownButton = { id: '70897036-4f27-4325-9ed3-4ff9c314d35b' };
  private readonly landingPageForm = { id: 'pcgLandingPage' };
  private readonly packingSlipField = { id: 'txtLandingPagePackSlip' };
  private readonly searchIcon = { id: 'epSearchIcon' };
  private readonly grid = { id: 'EpGrid415' };
  private readonly gridHeaderTitle = { id: 'gridHeaderTitle' };

  constructor(
    private driver: WebDriverWrapper,
    private logger: ITestLogger
  ) {}

  async fillPackingSlip(value: string): Promise<void> {
    this.logger.info(`Filling Packing Slip field with value "${value}"`);
    try {
      const input = await this.driver.findElement(this.packingSlipField);
      await input.sendKeys(value);
      this.logger.info(`Packing Slip field filled successfully`);
    } catch (error) {
      this.logger.error(`Error filling Packing Slip field`, error);
      throw error;
    }
  }

  async clickSearchAction(): Promise<void> {
    this.logger.info(`Clicking Search action button`);
    try {
      const button = await this.driver.findElement(this.actionsButtonSearch);
      await button.click();
      this.logger.info(`Search action button clicked successfully`);
    } catch (error) {
      this.logger.error(`Error clicking Search action button`, error);
      throw error;
    }
  }

  async clickNewReceiptAction(): Promise<void> {
    this.logger.info(`Clicking New Receipt action button`);
    try {
      const button = await this.driver.findElement(this.actionsButtonNewReceipt);
      await button.click();
      this.logger.info(`New Receipt action button clicked successfully`);
    } catch (error) {
      this.logger.error(`Error clicking New Receipt action button`, error);
      throw error;
    }
  }

  async clickAddIntercompanyReceiptAction(): Promise<void> {
    this.logger.info(`Clicking Add Intercompany Receipt action button`);
    try {
      const button = await this.driver.findElement(this.actionsButtonAddIntercompany);
      await button.click();
      this.logger.info(`Add Intercompany Receipt action button clicked successfully`);
    } catch (error) {
      this.logger.error(`Error clicking Add Intercompany Receipt action button`, error);
      throw error;
    }
  }

  async clickDropdownButton(): Promise<void> {
    this.logger.info(`Clicking dropdown button`);
    try {
      const button = await this.driver.findElement(this.dropdownButton);
      await button.click();
      this.logger.info(`Dropdown button clicked successfully`);
    } catch (error) {
      this.logger.error(`Error clicking dropdown button`, error);
      throw error;
    }
  }

  async getHeaderTitle(): Promise<string> {
    this.logger.info(`Getting header title text`);
    try {
      const element = await this.driver.findElement(this.title);
      const text = await element.getText();
      this.logger.info(`Header title text retrieved successfully`);
      return text;
    } catch (error) {
      this.logger.error(`Error getting header title text`, error);
      throw error;
    }
  }

  async getGridHeaderTitle(): Promise<string> {
    this.logger.info(`Getting grid header title text`);
    try {
      const element = await this.driver.findElement(this.gridHeaderTitle);
      const text = await element.getText();
      this.logger.info(`Grid header title text retrieved successfully`);
      return text;
    } catch (error) {
      this.logger.error(`Error getting grid header title text`, error);
      throw error;
    }
  }

  async clickSearchIcon(): Promise<void> {
    this.logger.info(`Clicking search icon`);
    try {
      const icon = await this.driver.findElement(this.searchIcon);
      await icon.click();
      this.logger.info(`Search icon clicked successfully`);
    } catch (error) {
      this.logger.error(`Error clicking search icon`, error);
      throw error;
    }
  }
}
```