//testcases on Calculator
var angCalculatorPage = require('./../pageobjects/angCalculatorPage.js');

describe("To check the functionality of calculator",function () {

    it("To check the addition of two numbers",async () =>{
        var firstInput=10;
        var SecondInput=20;
        var CalculatorPage = new angCalculatorPage();
        CalculatorPage.get();
        CalculatorPage.setFirstInput(firstInput);
        CalculatorPage.setSecondInput(SecondInput);
        CalculatorPage.clickOngoBtn();
        CalculatorPage.checkResult(firstInput+SecondInput);
    })
})