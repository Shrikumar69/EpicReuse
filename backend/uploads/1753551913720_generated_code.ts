/**
 * This Script contains the Reusable functions to automate AP Invoice Entry Group and Invoice UI interactions
 *
 *
**/
// General imports
import { EpMenuTCO, EpAccountTCO, EpViewTCO, TakeScreenshot } from '@epicor/uxp-package';
import { ErpLoginTCO, ErpSystemDialogTCO, ErpBPMMessageTCO, EpPanelCardTCO } from '@epicor/uxp-package';
import { HelperFunctions } from '../../common/helper';
import { relativeDate } from '../../Utils/Dates.util';
import { Postfunction } from '../ReusableFunctions/PostInvoice.funcs';
// AP Invoice Entry
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
     * This function sets the value for the Invoice Number field in the Invoices panel
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
     * This function clicks the Save Group action button
     *
     *
    **/
    async clickSaveGroup() {
        await this.actions.clickIcon('Save Group');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the New Group action button
     *
     *
    **/
    async clickNewGroup() {
        await this.APinvoicegroupEntry.Newgroup.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Invoice action button in the Invoices panel
     *
     *
    **/
    async clickNewInvoice() {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('Invoice');
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
     * This function selects a value from the Invoices dropdown filter
     *
     *
    **/
    async selectInvoicesDropdownFilter(value: string) {
        await this.APinvoicegroupEntry.EpDropdown439.openDropdown();
        await this.APinvoicegroupEntry.EpDropdown439.setValue(value);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function gets the value of the Group Status field
     *
     *
    **/
    async getGroupStatus(): Promise<string> {
        await this.APinvoicegroupEntry.txtLockStatus.waitForClickable();
        const status = await this.APinvoicegroupEntry.txtLockStatus.getValue();
        console.log('Group Status:', status);
        return status;
    }

    /**
     * This function gets the value of the Fiscal Period field
     *
     *
    **/
    async getFiscalPeriod(): Promise<string> {
        await this.APinvoicegroupEntry.nmbFiscalPeriodd7a89.waitForClickable();
        const period = await this.APinvoicegroupEntry.nmbFiscalPeriodd7a89.getValue();
        console.log('Fiscal Period:', period);
        return period;
    }

    /**
     * This function gets the value of the Apply Date field
     *
     *
    **/
    async getApplyDate(): Promise<string> {
        await this.APinvoicegroupEntry.txtApplyDatebb409.waitForClickable();
        const date = await this.APinvoicegroupEntry.txtApplyDatebb409.getValue();
        console.log('Apply Date:', date);
        return date;
    }

    /**
     * This function gets the value of the Base Total field
     *
     *
    **/
    async getBaseTotal(): Promise<string> {
        await this.APinvoicegroupEntry.cbxBaseTotalb028a.waitForClickable();
        const baseTotal = await this.APinvoicegroupEntry.cbxBaseTotalb028a.getValue();
        console.log('Base Total:', baseTotal);
        return baseTotal;
    }

    /**
     * This function gets the value of the Review Journal ID field
     *
     *
    **/
    async getReviewJournalID(): Promise<string> {
        await this.APinvoicegroupEntry.numRvJrnUID.waitForClickable();
        const rvJrnID = await this.APinvoicegroupEntry.numRvJrnUID.getValue();
        console.log('Review Journal ID:', rvJrnID);
        return rvJrnID;
    }

    /**
     * This function gets the value of the Active User ID field
     *
     *
    **/
    async getActiveUserID(): Promise<string> {
        await this.APinvoicegroupEntry.erptextboxc445e.waitForClickable();
        const userID = await this.APinvoicegroupEntry.erptextboxc445e.getValue();
        console.log('Active User ID:', userID);
        return userID;
    }

    /**
     * This function gets the value of the Fiscal Year field
     *
     *
    **/
    async getFiscalYear(): Promise<string> {
        await this.APinvoicegroupEntry.ErpFiscalYearFY.waitForClickable();
        const fiscalYear = await this.APinvoicegroupEntry.ErpFiscalYearFY.getValue();
        console.log('Fiscal Year:', fiscalYear);
        return fiscalYear;
    }

    /**
     * This function gets the value of the Fiscal Year Suffix field
     *
     *
    **/
    async getFiscalYearSuffix(): Promise<string> {
        await this.APinvoicegroupEntry.ErpFiscalYearSuffix.waitForClickable();
        const suffix = await this.APinvoicegroupEntry.ErpFiscalYearSuffix.getValue();
        console.log('Fiscal Year Suffix:', suffix);
        return suffix;
    }

    /**
     * This function gets the value of the Base Currency Symbol field
     *
     *
    **/
    async getBaseCurrencySymbol(): Promise<string> {
        await this.APinvoicegroupEntry.EpTextBox459.waitForClickable();
        const symbol = await this.APinvoicegroupEntry.EpTextBox459.getValue();
        console.log('Base Currency Symbol:', symbol);
        return symbol;
    }

    /**
     * This function gets the value of the Group panel title
     *
     *
    **/
    async getGroupPanelTitle(): Promise<string> {
        await this.APinvoicegroupEntry.pcTitleGroup.waitForClickable();
        const title = await this.APinvoicegroupEntry.pcTitleGroup.getComponent().getText();
        console.log('Group Panel Title:', title);
        return title;
    }

    /**
     * This function gets the value of the Invoices panel title
     *
     *
    **/
    async getInvoicesPanelTitle(): Promise<string> {
        await this.APinvoicegroupEntry.pcTitleInvoices.waitForClickable();
        const title = await this.APinvoicegroupEntry.pcTitleInvoices.getComponent().getText();
        console.log('Invoices Panel Title:', title);
        return title;
    }

    /**
     * This function waits for the AP Invoice Entry Group form to be loaded
     *
     *
    **/
    async waitForFormLoaded() {
        await this.menu.waitForLoadingBar();
        await this.APinvoicegroupEntry.epviewtitle.waitForClickable();
    }
}
