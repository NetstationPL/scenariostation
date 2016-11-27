var seleniumWebdriver = require('selenium-webdriver');
var chai = require('chai');

module.exports = function () {
  this.Given(/^I am on page$/, function() {
    return this.driver.get('http://localhost:3000/');
  });

  this.When(/^I click on "([^"]*)"$/, function (text) {
    return this.driver.findElement(seleniumWebdriver.By.xpath("//button[text()='" + text + "']")).then(function(element) {
      return element.click();
    });
  });

  this.Then('I should see filled inputs', function () {
      this.driver.findElements(seleniumWebdriver.By.xpath("//input[not(@value='')]")).then(
        function(elms) {
            expect(elms.length).to.equal(3);
        });
       
  });

   this.Given('steps was created in other scenarios:', function (table) {
       this.steps = table.rows
   });

   this.When('I typing {arg1:stringInDoubleQuotes} in {arg2:stringInDoubleQuotes} step', function (arg1, arg2) {
        return this.driver.findElement(seleniumWebdriver.By.xpath("//label[text()='" + arg2 + "']/../..//input")).then(
            function(element) {
                return element.sendKeys(arg1);
            }
        );
   });

   this.Then('I should see suggestion {arg1:stringInDoubleQuotes}', function (arg1) {
        return this.driver.findElement(seleniumWebdriver.By.xpath("//div[text()='" + arg1 + "']")).then(function(element) {
            return expect(element).to.not.be.undefined();
        });
   });
};
