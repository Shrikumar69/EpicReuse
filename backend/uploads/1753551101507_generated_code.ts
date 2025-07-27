/**
 * This Script contains the Reusable functions to automate AP Invoice Entry Group and Invoice actions
 *
 *
**/
// General imports
import { EpMenuTCO, EpAccountTCO, EpViewTCO, TakeScreenshot } from '@epicor/uxp-package';
import { ErpLoginTCO, ErpSystemDialogTCO, ErpBPMMessageTCO, EpPanelCardTCO } from '@epicor/uxp-package';
import { HelperFunctions } from '../../common/helper';
import { Postfunction } from '../ReusableFunctions/PostInvoice.funcs';
import { relativeDate } from '../../Utils/Dates.util';
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
     * This function clicks the New Group button and enters the Group ID
     *
     *
    **/
    async createNewGroup(grpid: string, saveStatus?: boolean) {
        console.log('AP Invoice Entry: Creating new group.');
        await this.menu.waitForLoadingBar();
        await this.APinvoicegroupEntry.Newgroup.getComponent().click();
        await this.menu.waitForLoadingBar();
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
    async searchGroupID() {
        await this.APinvoicegroupEntry.txtLandingPageGroupID.waitForClickable();
        await this.APinvoicegroupEntry.epSearchIcon.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Save Group icon
     *
     *
    **/
    async saveGroup() {
        await this.actions.clickIcon('Save Group');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Clear icon in the header actions
     *
     *
    **/
    async clearGroup() {
        await this.actions.clickIcon('Clear');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Refresh icon in the header actions
     *
     *
    **/
    async refreshGroup() {
        await this.actions.clickIcon('Refresh');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Save Group icon in the header actions
     *
     *
    **/
    async saveGroupHeader() {
        await this.actions.clickIcon('Save Group');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the overflow menu (three dots) in the header actions
     *
     *
    **/
    async openHeaderOverflowMenu() {
        await (await this.APinvoicegroupEntry.HeaderOverflowMenu.getComponent()).click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the New Group button in the panel card header
     *
     *
    **/
    async clickPanelCardNewGroup() {
        await this.APinvoicegroupEntry.PanelCardNewGroup.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Groups button in the panel card header
     *
     *
    **/
    async clickPanelCardGroups() {
        await this.APinvoicegroupEntry.PanelCardGroups.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Save Group icon in the panel card header
     *
     *
    **/
    async savePanelCardGroup() {
        await this.actions.clickIcon('Save Group');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the New Group icon in the panel card header
     *
     *
    **/
    async newPanelCardGroup() {
        await this.actions.clickIcon('New Group');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function enters a value in the Apply Date field
     *
     *
    **/
    async setApplyDate(dateValue: string) {
        await this.APinvoicegroupEntry.txtApplyDatebb409.waitForClickable();
        await this.APinvoicegroupEntry.txtApplyDatebb409.setValue(dateValue, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function enters a value in the Fiscal Period field
     *
     *
    **/
    async setFiscalPeriod(periodValue: string) {
        await this.APinvoicegroupEntry.nmbFiscalPeriodd7a89.waitForClickable();
        await this.APinvoicegroupEntry.nmbFiscalPeriodd7a89.setValue(periodValue, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function enters a value in the Fiscal Year field
     *
     *
    **/
    async setFiscalYear(yearValue: string) {
        await this.APinvoicegroupEntry.ErpFiscalYearFY.waitForClickable();
        await this.APinvoicegroupEntry.ErpFiscalYearFY.setValue(yearValue, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function enters a value in the Fiscal Year Suffix field
     *
     *
    **/
    async setFiscalYearSuffix(suffixValue: string) {
        await this.APinvoicegroupEntry.ErpFiscalYearSuffix.waitForClickable();
        await this.APinvoicegroupEntry.ErpFiscalYearSuffix.setValue(suffixValue, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function enters a value in the In Use By field
     *
     *
    **/
    async setInUseBy(userValue: string) {
        await this.APinvoicegroupEntry.erptextboxc445e.waitForClickable();
        await this.APinvoicegroupEntry.erptextboxc445e.setValue(userValue, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function enters a value in the Base Total field
     *
     *
    **/
    async setBaseTotal(baseTotalValue: string) {
        await this.APinvoicegroupEntry.cbxBaseTotalb028a.waitForClickable();
        await this.APinvoicegroupEntry.cbxBaseTotalb028a.setValue(baseTotalValue, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function enters a value in the Lock Status field
     *
     *
    **/
    async setLockStatus(statusValue: string) {
        await this.APinvoicegroupEntry.txtLockStatus.waitForClickable();
        await this.APinvoicegroupEntry.txtLockStatus.setValue(statusValue, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function enters a value in the Review Journal ID field
     *
     *
    **/
    async setReviewJournalID(jrnValue: string) {
        await this.APinvoicegroupEntry.numRvJrnUID.waitForClickable();
        await this.APinvoicegroupEntry.numRvJrnUID.setValue(jrnValue, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function selects a value from the Invoices dropdown
     *
     *
    **/
    async selectInvoicesDropdown(value: string) {
        await this.APinvoicegroupEntry.EpDropdown439.openDropdown();
        await this.APinvoicegroupEntry.EpDropdown439.setValue(value);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function enters a value in the Invoice Number field
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
    async searchInvoiceNumber() {
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.waitForClickable();
        await this.APinvoicegroupEntry.epSearchIconInvoiceNum.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Invoice icon in the Invoices panel card
     *
     *
    **/
    async clickInvoiceIcon() {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('Invoice');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Print Debit Memo icon in the Invoices panel card
     *
     *
    **/
    async clickPrintDebitMemoIcon() {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('Print Debit Memo');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the New Invoice icon in the Invoices panel card
     *
     *
    **/
    async clickNewInvoiceIcon() {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('Invoice');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the overflow menu (three dots) in the Invoices panel card
     *
     *
    **/
    async openInvoicesOverflowMenu() {
        await (await this.APinvoicegroupEntry.InvoicesOverflowMenu.getComponent()).click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function waits for the AP Invoice Entry grid to be visible
     *
     *
    **/
    async waitForGrid() {
        await this.APinvoicegroupEntry.EpGrid466.waitForVisibility();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function gets the text of the AP Invoice Entry grid header
     *
     *
    **/
    async getGridHeaderText(): Promise<string> {
        await this.APinvoicegroupEntry.gridHeaderTitle.waitForVisibility();
        const text = await this.APinvoicegroupEntry.gridHeaderTitle.getComponent().getText();
        return text;
    }
}