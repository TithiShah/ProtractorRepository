
var angCalculatorPage= function () {

    var firstInput=element(by.model('first'));
    var secondInput=element(by.model('second'));
    var operationdrp=element(by.model('operator'));
    var goBtn=element(by.buttonText('Go!'));
    var resultLable=element(by.tagName('h2'));

    this.get=function () {
        browser.get('http://www.way2automation.com/angularjs-protractor/calc');
        browser.manage().window().maximize();
        browser.driver.sleep(10000);
        browser.wait(function(){
            return firstInput.isDisplayed();
        }, 2*60*100)
    };

    this.setFirstInput=function (intFirst) {
        firstInput.clear();
        firstInput.sendKeys(intFirst);
    };

    this.setSecondInput=function (intSecond) {
        secondInput.clear();
        secondInput.sendKeys(intSecond);
    };

    this.getFirstInput = function() {
        return firstInput.getText();
    };

    this.getSecondInput = function() {
        return secondInput.getText();
    };

    this.clickOngoBtn=function () {
        goBtn.click();
        browser.driver.sleep(3000);
    };


    this.checkResult=function (expectedResult) {
        expect(element(by.tagName('h2')).getText()).toEqual(expectedResult.toString());
    };


};

module.exports=angCalculatorPage