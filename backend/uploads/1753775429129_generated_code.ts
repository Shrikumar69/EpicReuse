import { EpMenuTCO, EpAccountTCO, EpViewTCO, TakeScreenshot } from '@epicor/uxp-package';
import { ErpLoginTCO, ErpSystemDialogTCO, ErpBPMMessageTCO, EpPanelCardTCO } from '@epicor/uxp-package';
import { HelperFunctions } from '../../common/helper';
import { relativeDate } from '../../Utils/Dates.util';

export class ReceiptsEntryHelper {
    actions = new EpViewTCO();
    login = new ErpLoginTCO();
    menu = new EpMenuTCO();
    account = new EpAccountTCO();
    helper = new HelperFunctions();
    dialog = new ErpSystemDialogTCO();
    msg = new ErpBPMMessageTCO();
    TakeScreenshot = new TakeScreenshot();

    private readonly pcgLandingPageId = 'pcgLandingPage';
    private readonly txtLandingPagePackSlipId = 'txtLandingPagePackSlip';
    private readonly epViewHeaderId = 'ep-view-header';
    private readonly epViewTitleId = 'ep-view-title';
    private readonly epViewSubtitlesId = 'ep-view-subtitles';
    private readonly epActionsButtonId = 'ep-actions-button';
    private readonly epDropdownButtonId = 'f0ebb6be-9e47-4a2b-8b56-80885e96138a';
    private readonly epGridId = 'EpGrid454';

    async openReceiptsEntry(menuName: string) {
        console.log('Opening Receipts Entry form.');
        try {
            await this.menu.searchAndSelectMenuItem(menuName);
            await this.menu.waitForLoadingBar();
            console.log('Receipts Entry form opened.');
        } catch (error) {
            console.log('Error while opening Receipts Entry form: ' + error);
            throw error;
        }
    }

    async setPackingSlip(packingSlip: string) {
        console.log('Setting Packing Slip.');
        try {
            const packingSlipInput = await $(`#${this.txtLandingPagePackSlipId}`);
            await packingSlipInput.waitForClickable();
            await packingSlipInput.setValue(packingSlip, true);
            await this.menu.waitForLoadingBar();
            console.log('Packing Slip set.');
        } catch (error) {
            console.log('Error while setting Packing Slip: ' + error);
            throw error;
        }
    }

    async clickSearchIcon() {
        console.log('Clicking Search icon.');
        try {
            const searchButton = await $(`//*[@id="${this.epActionsButtonId}"]//i[contains(@class,"mdi-magnify")]`);
            await searchButton.waitForClickable();
            await searchButton.click();
            await this.menu.waitForLoadingBar();
            console.log('Search icon clicked.');
        } catch (error) {
            console.log('Error while clicking Search icon: ' + error);
            throw error;
        }
    }

    async clickNewReceiptIcon() {
        console.log('Clicking New Receipt icon.');
        try {
            const newReceiptButton = await $(`//*[@id="${this.epActionsButtonId}"]//i[contains(@class,"mdi-plus-circle-outline")]`);
            await newReceiptButton.waitForClickable();
            await newReceiptButton.click();
            await this.menu.waitForLoadingBar();
            console.log('New Receipt icon clicked.');
        } catch (error) {
            console.log('Error while clicking New Receipt icon: ' + error);
            throw error;
        }
    }

    async clickAddIntercompanyReceiptIcon() {
        console.log('Clicking Add Intercompany Receipt icon.');
        try {
            const intercompanyButton = await $(`//*[@id="${this.epActionsButtonId}"]//i[contains(@class,"mdi-factory")]`);
            await intercompanyButton.waitForClickable();
            await intercompanyButton.click();
            await this.menu.waitForLoadingBar();
            console.log('Add Intercompany Receipt icon clicked.');
        } catch (error) {
            console.log('Error while clicking Add Intercompany Receipt icon: ' + error);
            throw error;
        }
    }

    async openOverflowMenu() {
        console.log('Opening Overflow menu.');
        try {
            const overflowButton = await $(`#${this.epDropdownButtonId}`);
            await overflowButton.waitForClickable();
            await overflowButton.click();
            await this.menu.waitForLoadingBar();
            console.log('Overflow menu opened.');
        } catch (error) {
            console.log('Error while opening Overflow menu: ' + error);
            throw error;
        }
    }

    async getFormTitle(): Promise<string> {
        console.log('Getting form title.');
        try {
            const titleElement = await $(`#${this.epViewTitleId}`);
            await titleElement.waitForDisplayed();
            const title = await titleElement.getText();
            console.log('Form title: ' + title);
            return title;
        } catch (error) {
            console.log('Error while getting form title: ' + error);
            throw error;
        }
    }

    async waitForGridLoaded() {
        console.log('Waiting for grid to load.');
        try {
            const grid = await $(`#${this.epGridId}`);
            await grid.waitForDisplayed();
            await this.menu.waitForLoadingBar();
            console.log('Grid loaded.');
        } catch (error) {
            console.log('Error while waiting for grid to load: ' + error);
            throw error;
        }
    }
}