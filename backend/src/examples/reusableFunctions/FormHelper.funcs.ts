// Sample reusable function for general form handling
import { WebElementWrapper, WebDriverWrapper } from '../../utils/selenium-wrappers';
import { ITestLogger } from '../../utils/logger';

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
    this.logger.info(`Filling field "${label}" with value "${value}"`);
    try {
      const labelElement = await this.driver.findElement(`//label[contains(text(), "${label}")]`);
      const id = await labelElement.getAttribute('for');
      const input = await this.driver.findElement(`//input[@id="${id}"]`);
      await input.sendKeys(value);
      this.logger.info(`Field "${label}" filled successfully`);
    } catch (error) {
      this.logger.error(`Error filling field "${label}"`, error);
      throw error;
    }
  }

  /**
   * Selects an option from a dropdown by label
   * @param label The label text of the dropdown
   * @param optionText The text of the option to select
   */
  async selectOptionByLabel(label: string, optionText: string): Promise<void> {
    this.logger.info(`Selecting option "${optionText}" from dropdown "${label}"`);
    try {
      const labelElement = await this.driver.findElement(`//label[contains(text(), "${label}")]`);
      const id = await labelElement.getAttribute('for');
      const select = await this.driver.findElement(`//select[@id="${id}"]`);
      await select.click();
      
      const option = await this.driver.findElement(`//option[text()="${optionText}"]`);
      await option.click();
      
      this.logger.info(`Option "${optionText}" selected successfully from dropdown "${label}"`);
    } catch (error) {
      this.logger.error(`Error selecting option "${optionText}" from dropdown "${label}"`, error);
      throw error;
    }
  }

  /**
   * Clicks a button by text
   * @param buttonText The text of the button to click
   */
  async clickButtonByText(buttonText: string): Promise<void> {
    this.logger.info(`Clicking button "${buttonText}"`);
    try {
      const button = await this.driver.findElement(`//button[contains(text(), "${buttonText}")]`);
      await button.click();
      this.logger.info(`Button "${buttonText}" clicked successfully`);
    } catch (error) {
      this.logger.error(`Error clicking button "${buttonText}"`, error);
      throw error;
    }
  }
}
