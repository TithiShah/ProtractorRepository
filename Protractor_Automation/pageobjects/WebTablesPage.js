var testdata = require('../data/projectData.json');
var FunctionLibrary = require('./../pageobjects/FunctionLibrary.js');
var log4js = require('log4js');
var logger = log4js.getLogger();


var WebTablesPage= function () {

    var lnkAddUser= element(by.xpath("//button[@type='add' and @class='btn btn-link pull-right']"));
    var txtSearch=element(by.model('searchValue'));
    var txtFirstName=element(by.name('FirstName'));
    var txtLastName=element(by.name('LastName'));
    var txtUserName=element(by.name('UserName'));
    var txtPassword=element(by.name('Password'));
    var rbnFirstCompany=element(by.xpath("//input[@type='radio' and @value='15']"));
    var ddlroleId=element(by.name('RoleId'));
    var txtEmaiId=element(by.name('Email'));
    var txtMobileNo=element(by.name('Mobilephone'));
    var btnClose=element(by.className('btn btn-danger'));
    var btnSave=element(by.className('btn btn-success'));
    var UserTable=element(by.className('smart-table table table-striped'));
    var lnkEditUser=element(by.xpath("(//button[@type='edit'])[1]"));
    var lnkDeleteUser=element(by.xpath("(//i[@class='icon icon-remove'])[1]"));
    var btnConfirmDialogue=element(by.buttonText('OK'));

    this.get=function () {
        browser.get(testdata.Webtables_url);
        browser.debugger();
        logger.info("Browser is initiated at Url..."+testdata.Webtables_url);
        browser.manage().window().maximize();
        browser.driver.sleep(10000);
        browser.wait(function(){
            return UserTable.isDisplayed();
        }, 2*60*100)
    };

    function ClickAddUserLnk(){
        lnkAddUser.click();
        browser.driver.sleep(5000);
        logger.info("Click on Add User link");
    };

    function FillUserData(){
        var fLibrary = new FunctionLibrary();

        fLibrary.waitforElement(txtFirstName);
        txtFirstName.sendKeys(testdata.Add_FirstName);
        txtLastName.sendKeys(testdata.Add_LastName);
        txtUserName.sendKeys(testdata.Add_UserName);
        txtPassword.sendKeys(testdata.Add_Password);
        rbnFirstCompany.click();
        var select = ddlroleId;
        select.$('[value="1"]').click();
        txtEmaiId.sendKeys(testdata.Add_Email);
        txtMobileNo.sendKeys(testdata.Add_MobileNo);
    };

    function ClickAddUserLnk(){
        lnkAddUser.click();
        browser.driver.sleep(5000);
    };

    function ClickonSaveBtn() {
        btnSave.click();
        browser.driver.sleep(5000);
        logger.info("Click on save button.");
    };

    this.AddNewUser=function () {
        ClickAddUserLnk();
        FillUserData();
        ClickonSaveBtn();
    };

    this.verifyAddedUser=function (){

        element.all(by.xpath('//table/tbody//tr')).then(function(items) {
            if(items.length<1){
                logger.error('Record is not Added');
                //fail('Record is not Added');
            }
        });

        var cols = element.all(by.xpath('//table/tbody/tr[1]/td'));

        cols.get(0).getText().then(function (text) {
            expect(text.toString()).toEqual(testdata.Add_FirstName);
        });

        cols.get(1).getText().then(function (text) {
            expect(text.toString()).toEqual(testdata.Add_LastName);
        });

        cols.get(2).getText().then(function (text) {
            expect(text.toString()).toEqual(testdata.Add_UserName);
        });

        cols.get(5).getText().then(function (text) {
            expect(text.toString()).toEqual('Customer');
        });

        cols.get(6).getText().then(function (text) {
            expect(text.toString()).toEqual(testdata.Add_Email);
        });

        cols.get(7).getText().then(function (text) {
           // console.log(i+" log "+text.toString())
            expect(text.toString()).toEqual(testdata.Add_MobileNo);
        });
    };

    function ClickEditUserLnk(){
        var fLibrary=new FunctionLibrary();
        fLibrary.waitforElement(lnkEditUser);
        lnkEditUser.click();
        logger.info('click on edit user link.');
        browser.driver.sleep(5000);
    };

    function UpdateUserData(){
        var fLibrary=new FunctionLibrary();
        fLibrary.waitforElement(txtFirstName);
        txtFirstName.clear();
        txtFirstName.sendKeys(testdata.Edit_FirstName);
        txtLastName.clear();
        txtLastName.sendKeys(testdata.Edit_LastName);
        txtUserName.clear();
        txtUserName.sendKeys(testdata.Edit_UserName);
      };

    this.EditUser=function () {
        ClickEditUserLnk();
        UpdateUserData();
        ClickonSaveBtn();
    };

    this.verifyEditedUser=function (){
        var cols = element.all(by.xpath('//table/tbody/tr[1]/td'));

        cols.get(0).getText().then(function (text) {
            expect(text.toString()).toEqual(testdata.Edit_FirstName);
        });

        cols.get(1).getText().then(function (text) {
            expect(text.toString()).toEqual(testdata.Edit_LastName);
        });

        cols.get(2).getText().then(function (text) {
            expect(text.toString()).toEqual(testdata.Edit_UserName);
        });
    };

    this.DeleteUser=function() {
        browser.sleep(10000);
        element.all(by.xpath("//table[contains(@class,'table-striped')]/tbody//tr")).count().then(function(count){
            console.log("size"+count);
            clickDeletelnk();
            ConfirmDialogue();
            checkUserDelete(count);
        });
    };

    function  clickDeletelnk() {
        var fLibrary=new FunctionLibrary();
        fLibrary.waitforElement(lnkDeleteUser);
        lnkDeleteUser.click();
        browser.driver.sleep(3000);
    }

    function ConfirmDialogue() {
        var fLibrary=new FunctionLibrary();
        fLibrary.waitforElement(btnConfirmDialogue);
        btnConfirmDialogue.click();
        browser.driver.sleep(5000);
    }

    function checkUserDelete(CountBeforeDelete) {

        element.all(by.xpath("//table[contains(@class,'table-striped')]/tbody//tr")).count().then(function(count){
            console.log("size"+count);
            var CountAfterDelete=count;
            var ExpectedCount=parseInt(CountBeforeDelete)-1;

            if(CountAfterDelete==ExpectedCount){
                console.log("User Delete functionality is working properly.")
            }else{
                fail("User Delete functionality is not working.");
            }
        });
    }
}
module.exports=WebTablesPage