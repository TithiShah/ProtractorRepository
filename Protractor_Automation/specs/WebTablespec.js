
var WebTablePage = require('./../pageobjects/WebTablesPage.js');

describe("webTables",function () {

    it("To Check the functionality of add user",function () {
        var WebTable=new WebTablePage();
        WebTable.get();
        WebTable.AddNewUser();
        WebTable.verifyAddedUser();
    })

   it("To Check the functionality of edit user",function () {
        var WebTable=new WebTablePage();
        WebTable.EditUser();
        WebTable.verifyEditedUser();
    })

    it("To Check the functionality of delete user",function () {
        var WebTable=new WebTablePage();
        WebTable.DeleteUser();
    })
})