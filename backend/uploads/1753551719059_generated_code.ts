/**
 * This Script contains the Reusable functions to automate AP Invoice Entry Group and Invoice UI actions
 *
 *
**/
// General imports
import { EpMenuTCO, EpAccountTCO, EpViewTCO, TakeScreenshot } from '@epicor/uxp-package';
import { ErpLoginTCO, ErpSystemDialogTCO, ErpBPMMessageTCO, EpPanelCardTCO } from '@epicor/uxp-package';
import { HelperFunctions } from '../../common/helper';
import { relativeDate } from '../../Utils/Dates.util';
import { Postfunction } from '../ReusableFunctions/PostInvoice.funcs';
import { ErpUIAPInvoiceEntry } from '../../../../ui/src/UIApps/Erp.UI.APInvoiceEntry/page-object/Erp.UI.APInvoiceEntry.po';
import { ErpUIAPInvoiceEntryExt } from '../../../../ui/src/UIApps/Erp.UI.APInvoiceEntry/page-object/Erp.UI.APInvoiceEntry.Ext.po';

export class APInvoiceEntryGroupHelper {

    actions = new EpViewTCO();
    login = new ErpLoginTCO();
    menu = new EpMenuTCO();
    account = new EpAccountTCO();
    helper = new HelperFunctions();
    TakeScreenshot = new TakeScreenshot();
    dialog = new ErpSystemDialogTCO();
    msg = new ErpBPMMessageTCO();
    post = new Postfunction();

    APinvoicegroupEntry = new ErpUIAPInvoiceEntry();
    APinvoiceEntryExt = new ErpUIAPInvoiceEntryExt();

    todayDate = new Date();
    Plus1weekDate = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate() + 7);
    Plus1weekDateString = this.Plus1weekDate.toLocaleDateString(undefined,
        { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '');

    /**
     * This function creates a new AP Invoice Group by Group ID and saves it
     *
     *
    **/
    async createAPInvoiceGroup(grpid: string, saveStatus?: boolean) {
        console.log('AP Invoice Entry Group form.');
        await this.menu.waitForLoadingBar();
        await this.APinvoicegroupEntry.Newgroup.getComponent().click();
        await this.menu.waitForLoadingBar();
        console.log('New Group clicked');
        await this.APinvoicegroupEntry.txtLandingPageGroupID.waitForClickable();
        await this.APinvoicegroupEntry.txtLandingPageGroupID.setValue(grpid, true);
        await this.menu.waitForLoadingBar();
        if (saveStatus === undefined || saveStatus === true) {
            await this.actions.clickIcon('Save Group');
            await this.menu.waitForLoadingBar();
        }
    }

    /**
     * This function clicks the Search icon in the Group ID field
     *
     *
    **/
    async clickGroupIDSearchIcon() {
        await this.APinvoicegroupEntry.txtLandingPageGroupID.waitForClickable();
        await this.APinvoicegroupEntry.epSearchIcon.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function sets the Apply Date in the Apply Date field
     *
     *
    **/
    async setApplyDate(applyDate: string) {
        await this.APinvoicegroupEntry.txtApplyDatebb409.waitForClickable();
        await this.APinvoicegroupEntry.txtApplyDatebb409.setValue(applyDate, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function gets the Fiscal Period value
     *
     *
    **/
    async getFiscalPeriod(): Promise<string> {
        await this.APinvoicegroupEntry.nmbFiscalPeriodd7a89.waitForClickable();
        const value = await this.APinvoicegroupEntry.nmbFiscalPeriodd7a89.getValue();
        return value;
    }

    /**
     * This function gets the Fiscal Year value
     *
     *
    **/
    async getFiscalYear(): Promise<string> {
        await this.APinvoicegroupEntry.ErpFiscalYearFY.waitForClickable();
        const value = await this.APinvoicegroupEntry.ErpFiscalYearFY.getValue();
        return value;
    }

    /**
     * This function gets the Fiscal Year Suffix value
     *
     *
    **/
    async getFiscalYearSuffix(): Promise<string> {
        await this.APinvoicegroupEntry.ErpFiscalYearSuffix.waitForClickable();
        const value = await this.APinvoicegroupEntry.ErpFiscalYearSuffix.getValue();
        return value;
    }

    /**
     * This function gets the In Use By value
     *
     *
    **/
    async getInUseBy(): Promise<string> {
        await this.APinvoicegroupEntry.erptextboxc445e.waitForClickable();
        const value = await this.APinvoicegroupEntry.erptextboxc445e.getValue();
        return value;
    }

    /**
     * This function gets the Base Currency Symbol value
     *
     *
    **/
    async getBaseCurrencySymbol(): Promise<string> {
        await this.APinvoicegroupEntry.EpTextBox459.waitForClickable();
        const value = await this.APinvoicegroupEntry.EpTextBox459.getValue();
        return value;
    }

    /**
     * This function gets the Base Total value
     *
     *
    **/
    async getBaseTotal(): Promise<string> {
        await this.APinvoicegroupEntry.EpNumericBox419.waitForClickable();
        const value = await this.APinvoicegroupEntry.EpNumericBox419.getValue();
        return value;
    }

    /**
     * This function gets the Lock Status value
     *
     *
    **/
    async getLockStatus(): Promise<string> {
        await this.APinvoicegroupEntry.txtLockStatus.waitForClickable();
        const value = await this.APinvoicegroupEntry.txtLockStatus.getValue();
        return value;
    }

    /**
     * This function gets the Review Journal ID value
     *
     *
    **/
    async getReviewJournalID(): Promise<string> {
        await this.APinvoicegroupEntry.numRvJrnUID.waitForClickable();
        const value = await this.APinvoicegroupEntry.numRvJrnUID.getValue();
        return value;
    }

    /**
     * This function selects an invoice filter from the Invoices dropdown
     *
     *
    **/
    async selectInvoiceFilter(filter: string) {
        await this.APinvoicegroupEntry.EpDropdown439.openDropdown();
        await this.APinvoicegroupEntry.EpDropdown439.setValue(filter);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function sets the Invoice Number in the Invoice Number field
     *
     *
    **/
    async setInvoiceNumber(invoiceNum: string) {
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.waitForClickable();
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.setValue(invoiceNum, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Search icon in the Invoice Number field
     *
     *
    **/
    async clickInvoiceNumberSearchIcon() {
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.waitForClickable();
        await this.APinvoicegroupEntry.epSearchIconInvoiceNum.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the New Group action button
     *
     *
    **/
    async clickNewGroupButton() {
        await this.APinvoicegroupEntry.Newgroup.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Save Group action button
     *
     *
    **/
    async clickSaveGroupButton() {
        await this.actions.clickIcon('Save Group');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Invoice action button
     *
     *
    **/
    async clickInvoiceButton() {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('Invoice');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Search, Clear, Refresh, or Save Group icon in the header actions
     * @param iconTitle The title of the icon to click (e.g. 'Search', 'Clear', 'Refresh', 'Save Group')
     *
    **/
    async clickHeaderActionIcon(iconTitle: string) {
        await this.actions.clickIcon(iconTitle);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the overflow menu button in the header
     *
     *
    **/
    async clickHeaderOverflowMenu() {
        await this.APinvoicegroupEntry.EpDropdownButton463.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the overflow menu button in the Group panel
     *
     *
    **/
    async clickGroupOverflowMenu() {
        await this.APinvoicegroupEntry.EpDropdownButton376.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the overflow menu button in the Invoices panel
     *
     *
    **/
    async clickInvoicesOverflowMenu() {
        await this.APinvoicegroupEntry.EpDropdownButton441.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function waits for the AP Invoice Entry grid to be visible
     *
     *
    **/
    async waitForInvoiceGrid() {
        await this.APinvoicegroupEntry.EpGrid466.waitForVisibility();
    }

    /**
     * This function gets the grid header titles as an array of strings
     *
     *
    **/
    async getInvoiceGridHeaderTitles(): Promise<string[]> {
        const headers = await $$('//*[@id="gridHeaderTitle"]');
        const titles: string[] = [];
        for (const header of headers) {
            titles.push(await header.getText());
        }
        return titles;
    }
}
