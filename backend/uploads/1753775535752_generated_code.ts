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
    todayDate = new Date();
    Plus1weekDate = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate() + 7);
    Plus1weekDateString = this.Plus1weekDate.toLocaleDateString(undefined,
        { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '');

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
    private readonly gridLines = $('#EpGrid756');

    async enterHeaderDetails(po: string, supplierId: string, purPoint: string, packSlip: string) {
        console.log('Entering Receipt Header Details.');
        try {
            await this.txtPONum.waitForClickable();
            await this.txtPONum.setValue(po, true);
            await this.txtSupplierID.waitForClickable();
            await this.txtSupplierID.setValue(supplierId, true);
            await this.txtPurPoint.waitForClickable();
            await this.txtPurPoint.setValue(purPoint, true);
            await this.txtKeyField.waitForClickable();
            await this.txtKeyField.setValue(packSlip, true);
            await this.menu.waitForLoadingBar();
            console.log('Receipt Header Details entered.');
        } catch (error) {
            console.log('Error entering Receipt Header Details: ' + error);
            throw error;
        }
    }

    async clickMassReceipt() {
        console.log('Clicking Mass Receipt button.');
        try {
            await this.btnMassReceipt.waitForClickable();
            await this.btnMassReceipt.click();
            await this.menu.waitForLoadingBar();
            console.log('Mass Receipt button clicked.');
        } catch (error) {
            console.log('Error clicking Mass Receipt button: ' + error);
            throw error;
        }
    }

    async saveReceipt() {
        console.log('Saving Receipt.');
        try {
            await this.btnSave.waitForClickable();
            await this.btnSave.click();
            await this.menu.waitForLoadingBar();
            console.log('Receipt saved.');
        } catch (error) {
            console.log('Error saving Receipt: ' + error);
            throw error;
        }
    }

    async createNewReceipt() {
        console.log('Creating New Receipt.');
        try {
            await this.btnNewReceipt.waitForClickable();
            await this.btnNewReceipt.click();
            await this.menu.waitForLoadingBar();
            console.log('New Receipt created.');
        } catch (error) {
            console.log('Error creating New Receipt: ' + error);
            throw error;
        }
    }

    async setComments(comments: string) {
        console.log('Setting Receipt Comments.');
        try {
            await this.txtComments.waitForClickable();
            await this.txtComments.setValue(comments, true);
            await this.menu.waitForLoadingBar();
            console.log('Receipt Comments set.');
        } catch (error) {
            console.log('Error setting Receipt Comments: ' + error);
            throw error;
        }
    }

    async checkReceivedAll() {
        console.log('Checking Received All.');
        try {
            await this.chkReceivedAll.waitForClickable();
            if (!(await this.chkReceivedAll.isSelected())) {
                await this.chkReceivedAll.click();
            }
            await this.menu.waitForLoadingBar();
            console.log('Received All checked.');
        } catch (error) {
            console.log('Error checking Received All: ' + error);
            throw error;
        }
    }

    async getLinesCount(): Promise<number> {
        console.log('Getting Receipt Lines count.');
        try {
            await this.gridLines.waitForDisplayed();
            const rows = await this.gridLines.$$('//tr[contains(@class,"k-table-row")]');
            console.log('Receipt Lines count: ' + rows.length);
            return rows.length;
        } catch (error) {
            console.log('Error getting Receipt Lines count: ' + error);
            throw error;
        }
    }
}