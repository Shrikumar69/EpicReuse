import { EpMenuTCO, EpAccountTCO, EpViewTCO, TakeScreenshot } from '@epicor/uxp-package';
import { ErpLoginTCO, ErpSystemDialogTCO, ErpBPMMessageTCO, EpPanelCardTCO } from '@epicor/uxp-package';
import { HelperFunctions } from '../../common/helper';
import { relativeDate } from '../../Utils/Dates.util';
import { StartForm } from '../ReusableFunctions/CompanyChange.po';
import { Detailslayout } from '../../../../ui/src/UIApps/Erp.UI.ReceiptEntry/page-object/Details.po';
import { ErpUIReceiptEntry } from '../../../../ui/src/UIApps/Erp.UI.ReceiptEntry/page-object/Erp.UI.ReceiptEntry.po';

export class ReceiptEntryHelperFuncs {
    actions = new EpViewTCO();
    login = new ErpLoginTCO();
    menu = new EpMenuTCO();
    account = new EpAccountTCO();
    helper = new HelperFunctions();
    dialog = new ErpSystemDialogTCO();
    msg = new ErpBPMMessageTCO();
    startForm = new StartForm();
    ReceiptEntry = new ErpUIReceiptEntry();
    Details = new Detailslayout();
    todayDate = new Date();
    Plus1weekDate = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate() + 7);
    Plus1weekDateString = this.Plus1weekDate.toLocaleDateString(undefined,
        { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '');
    receiptDetail: any;

    async OpenReceiptEntry(menuName: string) {
        try {
            console.log('Opening Receipt Entry form.');
            await this.menu.searchAndSelectMenuItem(menuName);
            await this.menu.waitForLoadingBar();
            console.log('Receipt Entry form opened.');
        } catch (error) {
            console.log('Error in OpenReceiptEntry:', error);
            throw error;
        }
    }

    async CreateNewReceipt(packingSlip: string, supplierId: string, purPoint: string) {
        try {
            console.log('Creating new receipt.');
            await this.actions.clickIcon('New Receipt');
            await this.menu.waitForLoadingBar();
            await this.Details.txtKeyField.setValue(packingSlip, true);
            await this.Details.txtSupplierID.setValue(supplierId, true);
            await this.Details.txtPurPoint.setValue(purPoint, true);
            await this.menu.waitForLoadingBar();
            console.log('New receipt created.');
        } catch (error) {
            console.log('Error in CreateNewReceipt:', error);
            throw error;
        }
    }

    async SetEntryDates(entryDate: string, arrivalDate: string, receiptDate: string) {
        try {
            console.log('Setting entry, arrival, and receipt dates.');
            await this.Details.dteEntryDate.setValue(entryDate, true);
            await this.Details.dteArrivedDate.setValue(arrivalDate, true);
            await this.Details.dteDate.setValue(receiptDate, true);
            await this.menu.waitForLoadingBar();
            console.log('Dates set.');
        } catch (error) {
            console.log('Error in SetEntryDates:', error);
            throw error;
        }
    }

    async SetImportDetails(importNum: string, importedFrom: string) {
        try {
            console.log('Setting import details.');
            await this.Details.txtImportNum.setValue(importNum, true);
            await this.Details.txtImportedFromDesc.setValue(importedFrom, true);
            await this.menu.waitForLoadingBar();
            console.log('Import details set.');
        } catch (error) {
            console.log('Error in SetImportDetails:', error);
            throw error;
        }
    }

    async SetTransactionDocType(tranDocType: string) {
        try {
            console.log('Setting transaction document type.');
            await this.Details.cboTranDocType.setValue(tranDocType, true);
            await this.menu.waitForLoadingBar();
            console.log('Transaction document type set.');
        } catch (error) {
            console.log('Error in SetTransactionDocType:', error);
            throw error;
        }
    }

    async SetIncoterm(incoterm: string, location: string) {
        try {
            console.log('Setting incoterm and location.');
            await this.Details.cboIncotermCode.setValue(incoterm, true);
            await this.Details.txtIncotermLocation.setValue(location, true);
            await this.menu.waitForLoadingBar();
            console.log('Incoterm and location set.');
        } catch (error) {
            console.log('Error in SetIncoterm:', error);
            throw error;
        }
    }

    async SetWeights(netWeight: string, grossWeight: string) {
        try {
            console.log('Setting net and gross weights.');
            await this.Details.numNetWeight.setValue(netWeight, true);
            await this.Details.numGrossWeight.setValue(grossWeight, true);
            await this.menu.waitForLoadingBar();
            console.log('Weights set.');
        } catch (error) {
            console.log('Error in SetWeights:', error);
            throw error;
        }
    }

    async SetTotals(linesAmount: string, indirectCosts: string, duties: string, tax: string, total: string) {
        try {
            console.log('Setting totals.');
            await this.Details.curLinesAmount.setValue(linesAmount, true);
            await this.Details.curIndirectCosts.setValue(indirectCosts, true);
            await this.Details.curDuties.setValue(duties, true);
            await this.Details.curTax.setValue(tax, true);
            await this.Details.curTotal.setValue(total, true);
            await this.menu.waitForLoadingBar();
            console.log('Totals set.');
        } catch (error) {
            console.log('Error in SetTotals:', error);
            throw error;
        }
    }

    async SetComments(comments: string) {
        try {
            console.log('Setting comments.');
            await this.Details.txtComments.setValue(comments, true);
            await this.menu.waitForLoadingBar();
            console.log('Comments set.');
        } catch (error) {
            console.log('Error in SetComments:', error);
            throw error;
        }
    }

    async SaveReceipt() {
        try {
            console.log('Saving receipt.');
            await this.actions.clickIcon('Save');
            await this.menu.waitForLoadingBar();
            console.log('Receipt saved.');
        } catch (error) {
            console.log('Error in SaveReceipt:', error);
            throw error;
        }
    }

    async ClickMassReceipt() {
        try {
            console.log('Clicking Mass Receipt button.');
            await this.ReceiptEntry.EpButton558.getComponent().click();
            await this.menu.waitForLoadingBar();
            console.log('Mass Receipt button clicked.');
        } catch (error) {
            console.log('Error in ClickMassReceipt:', error);
            throw error;
        }
    }

    async ClickOverflowMenu(menu: string) {
        try {
            console.log('Opening overflow menu.');
            await this.ReceiptEntry.f0ebb6be9e474a2b8b5680885e96138a.getComponent().click();
            await this.menu.waitForLoadingBar();
            await this.actions.overflowMenu.selectOverflowItem(menu);
            await this.menu.waitForLoadingBar();
            console.log('Overflow menu item selected.');
        } catch (error) {
            console.log('Error in ClickOverflowMenu:', error);
            throw error;
        }
    }
}