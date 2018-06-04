var testdata = require('../data/projectData.json');
var FunctionLibrary = require('./../pageobjects/FunctionLibrary.js');

var BankPage= function () {

    var btnCustomerLogin=element(by.buttonText('Customer Login'));
    var drpUserSelection=element(by.id('userSelect'));
    var btnLogin=element(by.buttonText('Login'));
    var tabDeposite=element(by.buttonText('Deposit'));
    var txtAmount=element(by.model('amount'));
    var Successmsg=element(by.xpath("//span[@class='error ng-binding']"));
    var btnDeposite=element(by.xpath("//button[@type='submit']"));
    var tabWithdrawl=element(by.buttonText('Withdrawl'));
    var btnWithdraw=element(by.xpath("//button[@type='submit']"));

    this.get=function () {
        //browser.waitForAngularEnabled(false);
        browser.get(testdata.bank_url);
        browser.debugger();
        browser.manage().window().maximize();
        browser.driver.sleep(10000);
        browser.wait(function(){
            return btnCustomerLogin.isDisplayed();
        }, 2*60*100)
    };

    function SelectCustomer(){
        var fLibrary = new FunctionLibrary();

        fLibrary.waitforElement(drpUserSelection);
        drpUserSelection.all(by.tagName('option'))
            .then(function (options) {
                options[1].click();
            });
    }

    function clickOnLoginbtn(){
        var fLibrary = new FunctionLibrary();
        fLibrary.waitforElement(btnLogin);
        btnLogin.click();
        browser.sleep(5000);
    }

    this.PerformDeposite=function(){
        var fLibrary = new FunctionLibrary();
        btnCustomerLogin.click();
        SelectCustomer();
        clickOnLoginbtn();
        fLibrary.waitforElement(tabDeposite);
        tabDeposite.click();
        browser.sleep(3000);
        fLibrary.waitforElement(txtAmount);
        txtAmount.clear();
        txtAmount.sendKeys('1500');
        btnDeposite.click();
        browser.sleep(3000);
        expect(Successmsg.isDisplayed()).toBe(true);
        expect(Successmsg.getText()).toBe('Deposit Successful');
    };

    this.PerformWithdrawl=function () {
        var fLibrary = new FunctionLibrary();
        fLibrary.waitforElement(tabWithdrawl);
        tabWithdrawl.click();
        browser.sleep(3000);
        fLibrary.waitforElement(txtAmount);
        txtAmount.clear();
        txtAmount.sendKeys('300');
        btnWithdraw.click();
        browser.sleep(3000);
        expect(Successmsg.isDisplayed()).toBe(true);
        expect(Successmsg.getText()).toBe('Transaction successful');
    };
}
module.exports=BankPage