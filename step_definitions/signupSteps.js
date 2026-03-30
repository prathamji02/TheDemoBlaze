const { Given, When, Then, setWorldConstructor } = require('@cucumber/cucumber');
const { Builder, By, Key, until, Capabilities } = require('selenium-webdriver');
const { expect } = require('chai');
const { CustomWorld } = require('../support/hooks');

setWorldConstructor(CustomWorld);

const credentials = {
    username: `testuser_${Date.now()}`,
    password: 'password123'
};

Given('I am on the DemoBlaze homepage', async function () {
    await this.driver.get('https://www.demoblaze.com/');
});

Given('I am on the Demoblaze homepage', async function () {
    await this.driver.get('https://www.demoblaze.com/');
});

When('I click the {string} link', async function (linkText) {
    const link = await this.driver.wait(until.elementLocated(By.xpath(`//a[text()='${linkText}']`)), 10000);
    await link.click();
});

When('I click the {string} navigation link', async function (linkText) {
    const link = await this.driver.wait(until.elementLocated(By.xpath(`//a[text()='${linkText}']`)), 10000);
    await link.click();
});

When('I fill the sign up form with a unique username and password', async function () {
    const usernameField = await this.driver.wait(until.elementLocated(By.id('sign-username')), 10000);
    const passwordField = await this.driver.wait(until.elementLocated(By.id('sign-password')), 10000);
    await usernameField.sendKeys(credentials.username);
    await passwordField.sendKeys(credentials.password);
});

When('I enter a unique username and password {string}', async function (password) {
    credentials.password = password;
    const usernameField = await this.driver.wait(until.elementLocated(By.id('sign-username')), 10000);
    const passwordField = await this.driver.wait(until.elementLocated(By.id('sign-password')), 10000);
    await this.driver.executeScript("arguments[0].value = arguments[1];", usernameField, credentials.username);
    await this.driver.executeScript("arguments[0].value = arguments[1];", passwordField, credentials.password);
});

When('I click the {string} button', async function (buttonText) {
    const button = await this.driver.wait(until.elementLocated(By.xpath(`//button[text()='${buttonText}'] | //a[text()='${buttonText}']`)), 10000);
    await button.click();
});

When('I click the {string} button in the modal', async function (buttonText) {
    const button = await this.driver.wait(until.elementLocated(By.xpath(`//button[text()='${buttonText}']`)), 10000);
    await this.driver.executeScript("arguments[0].click();", button);
});

Then('I should see a {string} confirmation alert', async function (alertText) {
    await this.driver.wait(until.alertIsPresent(), 10000);
    const alert = await this.driver.switchTo().alert();
    const actualText = await alert.getText();
    expect(actualText).to.include(alertText.replace('.', ''));
    await alert.accept();
});

Then('I should see the alert {string}', async function (alertText) {
    await this.driver.wait(until.alertIsPresent(), 10000);
    const alert = await this.driver.switchTo().alert();
    const actualText = await alert.getText();
    expect(actualText).to.equal(alertText);
    await alert.accept();
});

Given('I have a registered user', async function () {
    // This step ensures a user exists before we try to log in.
    // It's a "background" setup step.
    await this.driver.get('https://www.demoblaze.com/');
    await this.driver.wait(until.elementLocated(By.id('signin2')), 10000).click();
    await this.driver.wait(until.elementLocated(By.id('sign-username')), 10000).sendKeys(credentials.username);
    await this.driver.wait(until.elementLocated(By.id('sign-password')), 10000).sendKeys(credentials.password);
    await this.driver.findElement(By.xpath("//button[text()='Sign up']")).click();
    await this.driver.wait(until.alertIsPresent(), 10000);
    await this.driver.switchTo().alert().accept();
    // A small wait to ensure the modal closes before the next step which might click 'Log in'
    await this.driver.sleep(1000); 
    // Go back to homepage if needed, or ensure state is correct
    await this.driver.get('https://www.demoblaze.com/'); 
});

When("I fill the login form with the registered user's credentials", async function () {
    const usernameField = await this.driver.wait(until.elementLocated(By.id('loginusername')), 10000);
    await usernameField.sendKeys(credentials.username);
    const passwordField = await this.driver.wait(until.elementLocated(By.id('loginpassword')), 10000);
    await passwordField.sendKeys(credentials.password);
});

Then("I should see {string} and the user's name on the homepage", async function (welcomeText) {
    const welcomeElement = await this.driver.wait(until.elementLocated(By.id('nameofuser')), 10000);
    const welcomeMessage = await welcomeElement.getText();
    expect(welcomeMessage).to.equal(`${welcomeText} ${credentials.username}`);
});
