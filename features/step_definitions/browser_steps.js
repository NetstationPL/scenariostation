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
};
