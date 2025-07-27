/**
 * This Script contains the Reusable functions to automate AP Invoice Entry Group and Invoice UI actions
 *
 *
**/
import { EpMenuTCO, EpAccountTCO, EpViewTCO, TakeScreenshot } from '@epicor/uxp-package';
import { ErpLoginTCO, ErpSystemDialogTCO, ErpBPMMessageTCO, EpPanelCardTCO } from '@epicor/uxp-package';
import { HelperFunctions } from '../../common/helper';
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

    APinvoicegroupEntry = new ErpUIAPInvoiceEntry();
    APinvoiceEntryExt = new ErpUIAPInvoiceEntryExt();

    todayDate = new Date();
    Plus1weekDate = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate() + 7);
    Plus1weekDateString = this.Plus1weekDate.toLocaleDateString(undefined,
        { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '');

    /**
     * This function creates a new AP Invoice Group by Group ID and saves it
     *
     * @param grpid Group ID to use
     * @param saveStatus Optional, defaults to true
     */
    async CreateAPInvGrp(grpid: string, saveStatus?: boolean) {
        console.log('AP invoice entry form.');
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
     */
    async SearchGroupID() {
        await this.APinvoicegroupEntry.txtLandingPageGroupID.waitForClickable();
        await this.APinvoicegroupEntry.epSearchIcon.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function sets the Apply Date in the Apply Date field
     *
     * @param date Date string to set
     */
    async SetApplyDate(date: string) {
        await this.APinvoicegroupEntry.txtApplyDatebb409.waitForClickable();
        await this.APinvoicegroupEntry.txtApplyDatebb409.setValue(date, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function gets the Fiscal Period value
     *
     * @returns Promise<string>
     */
    async GetFiscalPeriod(): Promise<string> {
        await this.APinvoicegroupEntry.nmbFiscalPeriodd7a89.waitForClickable();
        const value = await this.APinvoicegroupEntry.nmbFiscalPeriodd7a89.getValue();
        return value;
    }

    /**
     * This function gets the Fiscal Year value
     *
     * @returns Promise<string>
     */
    async GetFiscalYear(): Promise<string> {
        await this.APinvoicegroupEntry.ErpFiscalYearFY.waitForClickable();
        const value = await this.APinvoicegroupEntry.ErpFiscalYearFY.getValue();
        return value;
    }

    /**
     * This function gets the Fiscal Year Suffix value
     *
     * @returns Promise<string>
     */
    async GetFiscalYearSuffix(): Promise<string> {
        await this.APinvoicegroupEntry.ErpFiscalYearSuffix.waitForClickable();
        const value = await this.APinvoicegroupEntry.ErpFiscalYearSuffix.getValue();
        return value;
    }

    /**
     * This function gets the Active User ID value
     *
     * @returns Promise<string>
     */
    async GetActiveUserID(): Promise<string> {
        await this.APinvoicegroupEntry.erptextboxc445e.waitForClickable();
        const value = await this.APinvoicegroupEntry.erptextboxc445e.getValue();
        return value;
    }

    /**
     * This function gets the Base Currency Symbol value
     *
     * @returns Promise<string>
     */
    async GetBaseCurrencySymbol(): Promise<string> {
        await this.APinvoicegroupEntry.EpTextBox459.waitForClickable();
        const value = await this.APinvoicegroupEntry.EpTextBox459.getValue();
        return value;
    }

    /**
     * This function gets the Base Total value
     *
     * @returns Promise<string>
     */
    async GetBaseTotal(): Promise<string> {
        await this.APinvoicegroupEntry.EpNumericBox419.waitForClickable();
        const value = await this.APinvoicegroupEntry.EpNumericBox419.getValue();
        return value;
    }

    /**
     * This function gets the Lock Status value
     *
     * @returns Promise<string>
     */
    async GetLockStatus(): Promise<string> {
        await this.APinvoicegroupEntry.txtLockStatus.waitForClickable();
        const value = await this.APinvoicegroupEntry.txtLockStatus.getValue();
        return value;
    }

    /**
     * This function gets the Review Journal ID value
     *
     * @returns Promise<string>
     */
    async GetReviewJournalID(): Promise<string> {
        await this.APinvoicegroupEntry.numRvJrnUID.waitForClickable();
        const value = await this.APinvoicegroupEntry.numRvJrnUID.getValue();
        return value;
    }

    /**
     * This function selects the Invoices panel and enters an Invoice Number
     *
     * @param invoiceNum Invoice Number to enter
     */
    async EnterInvoiceNumber(invoiceNum: string) {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.waitForVisibility();
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('Invoice');
        await this.menu.waitForLoadingBar();
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.waitForClickable();
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.setValue(invoiceNum, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Search icon in the Invoice Number field
     *
     */
    async SearchInvoiceNumber() {
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.waitForClickable();
        await this.APinvoicegroupEntry.epSearchIconInvoiceNum.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function gets the value of the Invoice Number field
     *
     * @returns Promise<string>
     */
    async GetInvoiceNumber(): Promise<string> {
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.waitForClickable();
        const value = await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.getValue();
        return value;
    }

    /**
     * This function gets the value of the Invoice Number field (second instance)
     *
     * @returns Promise<string>
     */
    async GetInvoiceNumber2(): Promise<string> {
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17_2.waitForClickable();
        const value = await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17_2.getValue();
        return value;
    }

    /**
     * This function gets the value of the Invoices dropdown
     *
     * @returns Promise<string>
     */
    async GetInvoicesDropdownValue(): Promise<string> {
        await this.APinvoicegroupEntry.EpDropdown439.waitForClickable();
        const value = await this.APinvoicegroupEntry.EpDropdown439.getValue();
        return value;
    }

    /**
     * This function gets the grid header titles in the Invoice grid
     *
     * @returns Promise<string[]>
     */
    async GetGridHeaderTitles(): Promise<string[]> {
        const headers: string[] = [];
        for (let i = 0; i < 16; i++) {
            const header = await this.APinvoicegroupEntry.gridHeaderTitle[i].getComponent().getText();
            headers.push(header);
        }
        return headers;
    }

    /**
     * This function clicks the Save Group icon
     *
     */
    async SaveGroup() {
        await this.actions.clickIcon('Save Group');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the New Group icon
     *
     */
    async NewGroup() {
        await this.APinvoicegroupEntry.Newgroup.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Refresh icon in the header actions
     *
     */
    async RefreshHeader() {
        await this.actions.clickIcon('Refresh');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Clear icon in the header actions
     *
     */
    async ClearHeader() {
        await this.actions.clickIcon('Clear');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Search icon in the header actions
     *
     */
    async SearchHeader() {
        await this.actions.clickIcon('Search');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Save Group icon in the header actions
     *
     */
    async SaveGroupHeader() {
        await this.actions.clickIcon('Save Group');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the New Group icon in the panel card header actions
     *
     */
    async NewGroupPanelCard() {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('New Group');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Invoice icon in the panel card header actions
     *
     */
    async NewInvoicePanelCard() {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('Invoice');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Print Debit Memo icon in the Invoices panel actions
     *
     */
    async PrintDebitMemo() {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('Print Debit Memo');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Invoice icon in the Invoices panel actions
     *
     */
    async NewInvoice() {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('Invoice');
        await this.menu.waitForLoadingBar();
    }
}
