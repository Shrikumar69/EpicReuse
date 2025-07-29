// Sample reusable function for general form handling

export class FormHelper {
  constructor() {}

  /**
   * Fills a form field by label
   * @param label The label text of the field
   * @param value The value to enter
   */
  async fillFieldByLabel(label: string, value: string): Promise<void> {
    console.log(`Filling field "${label}" with value "${value}"`);
    try {
      // Logic to find label element and associated input field
      // Then enter the value into the field
      console.log(`Field "${label}" filled successfully`);
    } catch (error) {
      console.error(`Error filling field "${label}"`, error);
      throw error;
    }
  }

  /**
   * Selects an option from a dropdown by label
   * @param label The label text of the dropdown
   * @param optionText The text of the option to select
   */
  async selectOptionByLabel(label: string, optionText: string): Promise<void> {
    console.log(`Selecting option "${optionText}" from dropdown "${label}"`);
    try {
      // Logic to find dropdown by label and select the option
      console.log(`Option "${optionText}" selected successfully from dropdown "${label}"`);
    } catch (error) {
      console.error(`Error selecting option "${optionText}" from dropdown "${label}"`, error);
      throw error;
    }
  }

  /**
   * Clicks a button by text
   * @param buttonText The text of the button to click
   */
  async clickButtonByText(buttonText: string): Promise<void> {
    console.log(`Clicking button "${buttonText}"`);
    try {
      // Logic to find and click button with the given text
      console.log(`Button "${buttonText}" clicked successfully`);
    } catch (error) {
      console.error(`Error clicking button "${buttonText}"`, error);
      throw error;
    }
  }
}
