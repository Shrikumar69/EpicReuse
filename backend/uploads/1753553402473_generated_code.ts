/**
 * This script contains AP Invoice Group reusable functions
 * for automating the AP Invoice Entry interface.
 *
 *
**/
import { EpMenuTCO, EpAccountTCO, EpViewTCO, TakeScreenshot } from '@epicor/uxp-package';
import { ErpLoginTCO, ErpSystemDialogTCO, ErpBPMMessageTCO, EpPanelCardTCO } from '@epicor/uxp-package';
import { HelperFunctions } from '../../common/helper';
import { relativeDate } from '../../Utils/Dates.util';
import { ErpUIAPInvoiceEntry } from '../../../../ui/src/UIApps/Erp.UI.APInvoiceEntry/page-object/Erp.UI.APInvoiceEntry.po';
import { ErpUIAPInvoiceEntryExt } from '../../../../ui/src/UIApps/Erp.UI.APInvoiceEntry/page-object/Erp.UI.APInvoiceEntry.Ext.po';

/**
 * This class provides reusable functions for AP Invoice Group actions.
 *
 *
**/
export class APInvoiceGroupHelper {
    actions = new EpViewTCO();
    login = new ErpLoginTCO();
    menu = new EpMenuTCO();
    account = new EpAccountTCO();
    helper = new HelperFunctions();
    dialog = new ErpSystemDialogTCO();
    msg = new ErpBPMMessageTCO();
    APinvoicegroupEntry = new ErpUIAPInvoiceEntry();
    APinvoiceEntryExt = new ErpUIAPInvoiceEntryExt();
    TakeScreenshot = new TakeScreenshot();
    todayDate = new Date();

    /**
     * This function enters a Group ID in the Group panel and saves the group.
     *
     *
    **/
    async enterGroupIDAndSave(groupId: string) {
        console.log('Entering Group ID and saving group.');
        await this.menu.waitForLoadingBar();
        await this.APinvoicegroupEntry.Newgroup.getComponent().click();
        await this.menu.waitForLoadingBar();
        await this.APinvoicegroupEntry.txtLandingPageGroupID.waitForClickable();
        await this.APinvoicegroupEntry.txtLandingPageGroupID.setValue(groupId, true);
        await this.menu.waitForLoadingBar();
        await this.actions.clickIcon('Save Group');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function sets the Apply Date in the Group panel.
     *
     *
    **/
    async setApplyDate(applyDate: string) {
        console.log('Setting Apply Date.');
        await this.APinvoicegroupEntry.txtApplyDatebb409.waitForClickable();
        await this.APinvoicegroupEntry.txtApplyDatebb409.setValue(applyDate);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function gets the current value of the Fiscal Period field.
     *
     *
    **/
    async getFiscalPeriod(): Promise<string> {
        await this.APinvoicegroupEntry.nmbFiscalPeriodd7a89.waitForVisibility();
        const value = await this.APinvoicegroupEntry.nmbFiscalPeriodd7a89.getValue();
        return value;
    }

    /**
     * This function gets the current value of the Fiscal Year Suffix field.
     *
     *
    **/
    async getFiscalYearSuffix(): Promise<string> {
        await this.APinvoicegroupEntry.fysGroupc639c.waitForVisibility();
        const value = await this.APinvoicegroupEntry.fysGroupc639c.getValue();
        return value;
    }

    /**
     * This function gets the current value of the Base Total currency box.
     *
     *
    **/
    async getBaseTotal(): Promise<string> {
        await this.APinvoicegroupEntry.cbxBaseTotalb028a.waitForVisibility();
        const value = await this.APinvoicegroupEntry.cbxBaseTotalb028a.getValue();
        return value;
    }

    /**
     * This function gets the current value of the Lock Status field.
     *
     *
    **/
    async getLockStatus(): Promise<string> {
        await this.APinvoicegroupEntry.txtLockStatus.waitForVisibility();
        const value = await this.APinvoicegroupEntry.txtLockStatus.getValue();
        return value;
    }

    /**
     * This function gets the current value of the Review Journal ID field.
     *
     *
    **/
    async getReviewJournalID(): Promise<string> {
        await this.APinvoicegroupEntry.numRvJrnUID.waitForVisibility();
        const value = await this.APinvoicegroupEntry.numRvJrnUID.getValue();
        return value;
    }

    /**
     * This function enters an Invoice Number in the Invoices panel card grid.
     *
     *
    **/
    async enterInvoiceNumber(invoiceNum: string) {
        console.log('Entering Invoice Number.');
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.waitForClickable();
        await this.APinvoicegroupEntry.numLandingPageInvoiceNumc9a17.setValue(invoiceNum, true);
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function selects the "Invoice" icon in the Invoices grid actions.
     *
     *
    **/
    async clickNewInvoiceIcon() {
        console.log('Clicking New Invoice icon.');
        await this.APinvoicegroupEntry.pcgLandingPage56ada.epActionsComp.clickIcon('Invoice');
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function clicks the Group Post button.
     *
     *
    **/
    async clickGroupPost() {
        console.log('Clicking Group Post.');
        await this.APinvoicegroupEntry.GroupPost.getComponent().click();
        await this.menu.waitForLoadingBar();
    }

    /**
     * This function gets the value of the Group ID field.
     *
     *
    **/
    async getGroupID(): Promise<string> {
        await this.APinvoicegroupEntry.txtLandingPageGroupID.waitForVisibility();
        const value = await this.APinvoicegroupEntry.txtLandingPageGroupID.getValue();
        return value;
    }

    /**
     * This function waits for the Group panel to be visible.
     *
     *
    **/
    async waitForGroupPanel() {
        await this.APinvoicegroupEntry.pcGroup.waitForVisibility();
    }

    /**
     * This function waits for the Invoices panel card grid to be visible.
     *
     *
    **/
    async waitForInvoicesGrid() {
        await this.APinvoicegroupEntry.pcgLandingPage56ada.waitForVisibility();
    }
}