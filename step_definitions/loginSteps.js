const { When, Then, setWorldConstructor } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const { CustomWorld } = require('../support/hooks');

setWorldConstructor(CustomWorld);

// CORRECT: async function ()
When('I login with username {string} and password {string}', async function (user, pass) {
    // USE: this.driver
    await this.driver.wait(until.elementLocated(By.id('loginusername')), 5000).sendKeys(user);
    await this.driver.findElement(By.id('loginpassword')).sendKeys(pass);
});

Then('the welcome message should display {string}', async function (expectedWelcome) {
    const welcomeText = await this.driver.wait(until.elementLocated(By.id('nameofuser')), 10000);
    const actualText = await welcomeText.getText();
    expect(actualText).to.equal(expectedWelcome);
});

When('I filter by the {string} category', async function (category) {
    const categoryLink = await this.driver.wait(until.elementLocated(By.xpath(`//a[text()='${category}']`)), 10000);
    await categoryLink.click();
});

Then('I should see the {string} in the product list', async function (productName) {
    const product = await this.driver.wait(until.elementLocated(By.xpath(`//a[text()='${productName}']`)), 10000);
    const isDisplayed = await product.isDisplayed();
    expect(isDisplayed).to.be.true;
});

When('I click on the {string} product', async function (productName) {
    // Wait a moment for the DOM to stabilize after filtering
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Refetch the element fresh to avoid stale element reference
    const product = await this.driver.wait(until.elementLocated(By.xpath(`//a[contains(text(), '${productName}')]`)), 10000);
    
    // Use executeScript to click to avoid interactability issues
    await this.driver.executeScript("arguments[0].click();", product);
});