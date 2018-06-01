var BankPage = require('./../pageobjects/BankPage.js');

describe("Bank Application",function () {

    it("To check the money deposite functionality in bank application",function () {
        var bankpage=new BankPage();
        bankpage.get();
        bankpage.PerformDeposite();
    })

    it("To check the money withdrawel functionality.",function () {
        var bankpage=new BankPage();
        bankpage.PerformWithdrawl();
    })

})