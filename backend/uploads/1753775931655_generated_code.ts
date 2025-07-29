import { EpMenuTCO, EpAccountTCO, EpViewTCO, TakeScreenshot } from '@epicor/uxp-package';
import { ErpLoginTCO, ErpSystemDialogTCO, ErpBPMMessageTCO, EpPanelCardTCO } from '@epicor/uxp-package';
import { HelperFunctions } from '../../common/helper';
import { relativeDate } from '../../Utils/Dates.util';

export class ReceiptEntryHelper {
    actions = new EpViewTCO();
    login = new ErpLoginTCO();
    menu = new EpMenuTCO();
    account = new EpAccountTCO();
    helper = new HelperFunctions();
    dialog = new ErpSystemDialogTCO();
    msg = new ErpBPMMessageTCO();
    TakeScreenshot = new TakeScreenshot();

    private readonly txtPONum = $('#k-bea4d399-36c1-4151-88b9-f76dc0e920df');
    private readonly txtSupplierID = $('#txtSupplierID');
    private readonly txtPurPoint = $('#txtPurPoint');
    private readonly txtSupplierAddress = $('#txtSupplierAddress');
    private readonly txtKeyField = $('#txtKeyField');
    private readonly txtEntryPerson = $('#txtEntryPerson');
    private readonly dteEntryDate = $('#datepicker-1');
    private readonly dteArrivedDate = $('#datepicker-2');
    private readonly cmbShipVia = $('#k-9fb2c56c-decd-4976-bde4-c480bc8f3af9');
    private readonly txtReceivingPerson = $('#txtReceivingPerson');
    private readonly dteReceiptDate = $('#datepicker-3');
    private readonly txtImportNum = $('#txtImportNum');
    private readonly txtImportedFromDesc = $('#txtImportedFromDesc');
    private readonly cboTranDocType = $('#k-c59fb15d-7eed-4f5f-99aa-facf2fc2dc62');
    private readonly txtLegalNumber = $('#txtLegalNumber');
    private readonly cmbIncotermCode = $('#k-e187b360-25e1-4f18-8b55-eedccf42e18b');
    private readonly txtIncotermLocation = $('#txtIncotermLocation');
    private readonly numNetWeight = $('#k-259d405c-c68d-417c-b123-a70f62565721');
    private readonly numGrossWeight = $('#k-d07656e2-6e3f-40c7-8939-71fbfb827ad5');
    private readonly curLinesAmount = $('#k-e0d8ba39-cd9e-438c-bb38-f59b6946cd71');
    private readonly curIndirectCosts = $('#k-37d50385-cd13-483b-bf92-ad283afaac1c');
    private readonly curDuties = $('#k-357837e1-f84d-4173-a825-ed3126b53631');
    private readonly curTax = $('#k-9a91beea-a1dc-48f2-ba80-4694b81f1f67');
    private readonly curTotal = $('#k-92fb493b-b29e-4e4a-99a5-d9208969ec71');
    private readonly txtComments = $('#txtComments');
    private readonly chkReceivedAll = $('#EpCheckBox682');
    private readonly btnMassReceipt = $('#EpButton558');
    private readonly btnSave = $('//*[@id="ep-actions-button"]//i[@title="Save"]');
    private readonly btnNewReceipt = $('//*[@id="ep-actions-button"]//i[@title="New Receipt"]');
    private readonly btnSearch = $('//*[@id="ep-actions-button"]//i[@title="Search"]');
    private readonly btnUndo = $('//*[@id="ep-actions-button"]//i[@title="Undo"]');
    private readonly btnClear = $('//*[@id="ep-actions-button"]//i[@title="Clear"]');
    private readonly btnRefresh = $('//*[@id="ep-actions-button"]//i[@title="Refresh"]');

    async enterPONum(poNum: string) {
        console.log('Entering PO Number.');
        try {
            await this.txtPONum.waitForClickable();
            await this.txtPONum.setValue(poNum, true);
            console.log('PO Number entered.');
        } catch (error) {
            console.log('Error entering PO Number: ' + error);
            throw error;
        }
    }

    async enterSupplierID(supplierID: string) {
        console.log('Entering Supplier ID.');
        try {
            await this.txtSupplierID.waitForClickable();
            await this.txtSupplierID.setValue(supplierID, true);
            console.log('Supplier ID entered.');
        } catch (error) {
            console.log('Error entering Supplier ID: ' + error);
            throw error;
        }
    }

    async enterPurchasePoint(purPoint: string) {
        console.log('Entering Purchase Point.');
        try {
            await this.txtPurPoint.waitForClickable();
            await this.txtPurPoint.setValue(purPoint, true);
            console.log('Purchase Point entered.');
        } catch (error) {
            console.log('Error entering Purchase Point: ' + error);
            throw error;
        }
    }

    async enterPackingSlip(packingSlip: string) {
        console.log('Entering Packing Slip.');
        try {
            await this.txtKeyField.waitForClickable();
            await this.txtKeyField.setValue(packingSlip, true);
            console.log('Packing Slip entered.');
        } catch (error) {
            console.log('Error entering Packing Slip: ' + error);
            throw error;
        }
    }

    async enterImportNumber(importNum: string) {
        console.log('Entering Import Number.');
        try {
            await this.txtImportNum.waitForClickable();
            await this.txtImportNum.setValue(importNum, true);
            console.log('Import Number entered.');
        } catch (error) {
            console.log('Error entering Import Number: ' + error);
            throw error;
        }
    }

    async enterImportedFrom(importedFrom: string) {
        console.log('Entering Imported From.');
        try {
            await this.txtImportedFromDesc.waitForClickable();
            await this.txtImportedFromDesc.setValue(importedFrom, true);
            console.log('Imported From entered.');
        } catch (error) {
            console.log('Error entering Imported From: ' + error);
            throw error;
        }
    }

    async selectTranDocType(tranDocType: string) {
        console.log('Selecting Transaction Document Type.');
        try {
            await this.cboTranDocType.waitForClickable();
            await this.cboTranDocType.setValue(tranDocType, true);
            console.log('Transaction Document Type selected.');
        } catch (error) {
            console.log('Error selecting Transaction Document Type: ' + error);
            throw error;
        }
    }

    async enterComments(comments: string) {
        console.log('Entering Comments.');
        try {
            await this.txtComments.waitForClickable();
            await this.txtComments.setValue(comments, true);
            console.log('Comments entered.');
        } catch (error) {
            console.log('Error entering Comments: ' + error);
            throw error;
        }
    }

    async clickSave() {
        console.log('Clicking Save.');
        try {
            await this.btnSave.waitForClickable();
            await this.btnSave.click();
            await this.menu.waitForLoadingBar();
            console.log('Save clicked.');
        } catch (error) {
            console.log('Error clicking Save: ' + error);
            throw error;
        }
    }

    async clickNewReceipt() {
        console.log('Clicking New Receipt.');
        try {
            await this.btnNewReceipt.waitForClickable();
            await this.btnNewReceipt.click();
            await this.menu.waitForLoadingBar();
            console.log('New Receipt clicked.');
        } catch (error) {
            console.log('Error clicking New Receipt: ' + error);
            throw error;
        }
    }

    async clickMassReceipt() {
        console.log('Clicking Mass Receipt.');
        try {
            await this.btnMassReceipt.waitForClickable();
            await this.btnMassReceipt.click();
            await this.menu.waitForLoadingBar();
            console.log('Mass Receipt clicked.');
        } catch (error) {
            console.log('Error clicking Mass Receipt: ' + error);
            throw error;
        }
    }

    async setReceivedAll(checked: boolean) {
        console.log('Setting Received All checkbox.');
        try {
            await this.chkReceivedAll.waitForClickable();
            const isChecked = await this.chkReceivedAll.isSelected();
            if (isChecked !== checked) {
                await this.chkReceivedAll.click();
            }
            console.log('Received All checkbox set.');
        } catch (error) {
            console.log('Error setting Received All checkbox: ' + error);
            throw error;
        }
    }

    async clickSearch() {
        console.log('Clicking Search.');
        try {
            await this.btnSearch.waitForClickable();
            await this.btnSearch.click();
            await this.menu.waitForLoadingBar();
            console.log('Search clicked.');
        } catch (error) {
            console.log('Error clicking Search: ' + error);
            throw error;
        }
    }

    async clickUndo() {
        console.log('Clicking Undo.');
        try {
            await this.btnUndo.waitForClickable();
            await this.btnUndo.click();
            await this.menu.waitForLoadingBar();
            console.log('Undo clicked.');
        } catch (error) {
            console.log('Error clicking Undo: ' + error);
            throw error;
        }
    }

    async clickClear() {
        console.log('Clicking Clear.');
        try {
            await this.btnClear.waitForClickable();
            await this.btnClear.click();
            await this.menu.waitForLoadingBar();
            console.log('Clear clicked.');
        } catch (error) {
            console.log('Error clicking Clear: ' + error);
            throw error;
        }
    }

    async clickRefresh() {
        console.log('Clicking Refresh.');
        try {
            await this.btnRefresh.waitForClickable();
            await this.btnRefresh.click();
            await this.menu.waitForLoadingBar();
            console.log('Refresh clicked.');
        } catch (error) {
            console.log('Error clicking Refresh: ' + error);
            throw error;
        }
    }
}