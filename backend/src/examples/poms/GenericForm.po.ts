// Sample Page Object Model for a generic form page
import { WebElementWrapper, WebDriverWrapper } from '../../utils/selenium-wrappers';
import { ITestLogger } from '../../utils/logger';

export class GenericFormPagePO {
  // Header selectors
  private readonly pageTitle = { epguid: 'page-title' };
  private readonly saveButton = { id: 'save-button' };
  private readonly submitButton = { epguid: 'submit-button' };
  private readonly cancelButton = { xpath: '//button[contains(text(), "Cancel")]' };
  
  // Form field selectors
  private readonly nameField = { id: 'name-field' };
  private readonly emailField = { epguid: 'email-field' };
  private readonly phoneField = { id: 'phone-field' };
  private readonly statusDropdown = { id: 'status-dropdown' };
  
  constructor(
    private driver: WebDriverWrapper,
    private logger: ITestLogger
  ) {}
  
  async getPageTitle(): Promise<string> {
    const element = await this.driver.findElement(this.pageTitle);
    return element.getText();
  }
  
  async enterName(name: string): Promise<void> {
    const element = await this.driver.findElement(this.nameField);
    await element.sendKeys(name);
  }
  
  async enterEmail(email: string): Promise<void> {
    const element = await this.driver.findElement(this.emailField);
    await element.sendKeys(email);
  }
  
  async enterPhone(phone: string): Promise<void> {
    const element = await this.driver.findElement(this.phoneField);
    await element.sendKeys(phone);
  }
  
  async selectStatus(status: string): Promise<void> {
    const dropdown = await this.driver.findElement(this.statusDropdown);
    await dropdown.click();
    
    const option = await this.driver.findElement(`//option[text()="${status}"]`);
    await option.click();
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
}
