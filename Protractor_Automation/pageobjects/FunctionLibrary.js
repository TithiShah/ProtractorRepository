
var FunctionLibrary= function () {
    var angCalculatorPage = require('./../pageobjects/angCalculatorPage.js');


    this.waitforElement=function(element){
        browser.wait(function(){
            return element.isDisplayed();
        }, 2*60*1000);
    };

    this.performOperation=function (strOperationName) {

        var CalculatorPage = new angCalculatorPage();
        var result='';
        if(CalculatorPage.firstInput.getText()!='') {
            if (strOperationName == 'addition') {
                console.log("First input " + firstInput.getText())
                result = parseInt(CalculatorPage.firstInput.getText()) + parseInt(CalculatorPage.secondInput.getText());
                console.log("Result of addition " + result.toString());
            } else if (strOperationName == 'subtraction') {
                result = parseInt(firstInput.getText().toString()) - parseInt(secondInput.getText().toString());

            } else if (strOperationName == 'multiplication') {
                result = parseInt(firstInput.getText().toString()) * parseInt(secondInput.getText().toString());

            } else if (strOperationName == 'divide') {
                result = parseInt(firstInput.getText().toString()) / parseInt(secondInput.getText().toString());

            }
        }
        return result;
    };
};
module.exports=FunctionLibrary




