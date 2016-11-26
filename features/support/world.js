var seleniumWebdriver = require('selenium-webdriver');

function CustomWorld() {
  this.driver = new seleniumWebdriver.Builder()
    .forBrowser('firefox')
    .build();
}

module.exports = function() {
  this.World = CustomWorld;
};
