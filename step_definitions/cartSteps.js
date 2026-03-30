const { Given, When, Then, setWorldConstructor } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const { CustomWorld } = require('../support/hooks');

setWorldConstructor(CustomWorld);

// Dynamic user for each test run to prevent "User already exists" errors
const loggedInUser = {
    username: `e2euser_${Date.now()}`,
    password: 'password123'
};

Given('I am a logged-in user', async function () {
    await this.driver.get('https://www.demoblaze.com/');
    
    // Wait for page to load
    await this.driver.wait(until.elementLocated(By.id('signin2')), 10000);
    
    // REGISTRATION
    const signupButton = await this.driver.wait(until.elementLocated(By.id('signin2')), 10000);
    await this.driver.executeScript("arguments[0].click();", signupButton);
    
    // Wait for modal to appear
    await this.driver.wait(until.elementLocated(By.id('sign-username')), 10000);
    
    const userField = await this.driver.findElement(By.id('sign-username'));
    const pwdField = await this.driver.findElement(By.id('sign-password'));
    
    // Use executeScript to set values to avoid interactability issues
    await this.driver.executeScript("arguments[0].value = arguments[1];", userField, loggedInUser.username);
    await this.driver.executeScript("arguments[0].value = arguments[1];", pwdField, loggedInUser.password);
    
    const signUpBtn = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Sign up')]")), 10000);
    await this.driver.executeScript("arguments[0].click();", signUpBtn);
    
    await this.driver.wait(until.alertIsPresent(), 10000);
    await this.driver.switchTo().alert().accept();

    // WAIT for the signup modal to disappear
    await new Promise(resolve => setTimeout(resolve, 1000));

    // LOGIN
    const loginButton = await this.driver.wait(until.elementLocated(By.id('login2')), 10000);
    await this.driver.executeScript("arguments[0].click();", loginButton);
    
    await this.driver.wait(until.elementLocated(By.id('loginusername')), 10000);
    
    const loginUserField = await this.driver.findElement(By.id('loginusername'));
    const loginPwdField = await this.driver.findElement(By.id('loginpassword'));
    
    await this.driver.executeScript("arguments[0].value = arguments[1];", loginUserField, loggedInUser.username);
    await this.driver.executeScript("arguments[0].value = arguments[1];", loginPwdField, loggedInUser.password);
    
    const logInBtn = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Log in')]")), 10000);
    await this.driver.executeScript("arguments[0].click();", logInBtn);
    
    // Verify login success
    await this.driver.wait(until.elementLocated(By.id('nameofuser')), 10000);
});

Given('I have added {string} to my cart', async function (productName) {
    await this.driver.get('https://www.demoblaze.com/');
    // Using XPath to find the specific product link
    const productLink = await this.driver.wait(until.elementLocated(By.xpath(`//a[text()='${productName}']`)), 10000);
    await productLink.click();
    
    const addToCartButton = await this.driver.wait(until.elementLocated(By.xpath("//a[text()='Add to cart']")), 10000);
    await addToCartButton.click();
    
    await this.driver.wait(until.alertIsPresent(), 10000);
    await this.driver.switchTo().alert().accept();
});

When('I view the cart and proceed to {string}', async function (action) {
    await this.driver.wait(until.elementLocated(By.id('cartur')), 10000).click();
    const actionButton = await this.driver.wait(until.elementLocated(By.xpath(`//button[text()='${action}']`)), 10000);
    await actionButton.click();
});

When('I fill out the purchase modal with my details', async function () {
    // Wait for the modal fields to be interactable
    const nameField = await this.driver.wait(until.elementLocated(By.id('name')), 10000);
    await this.driver.executeScript("arguments[0].value = arguments[1];", nameField, 'Pratham Garg');
    
    const countryField = await this.driver.wait(until.elementLocated(By.id('country')), 10000);
    await this.driver.executeScript("arguments[0].value = arguments[1];", countryField, 'India');
    
    const cityField = await this.driver.wait(until.elementLocated(By.id('city')), 10000);
    await this.driver.executeScript("arguments[0].value = arguments[1];", cityField, 'Delhi');
    
    const cardField = await this.driver.wait(until.elementLocated(By.id('card')), 10000);
    await this.driver.executeScript("arguments[0].value = arguments[1];", cardField, '424242424242');
    
    const monthField = await this.driver.wait(until.elementLocated(By.id('month')), 10000);
    await this.driver.executeScript("arguments[0].value = arguments[1];", monthField, '01');
    
    const yearField = await this.driver.wait(until.elementLocated(By.id('year')), 10000);
    await this.driver.executeScript("arguments[0].value = arguments[1];", yearField, '2026');
    
    // Clicking the purchase button inside the modal
    const purchaseButton = await this.driver.wait(until.elementLocated(By.xpath("//button[text()='Purchase']")), 10000);
    await this.driver.executeScript("arguments[0].click();", purchaseButton);
});

Then('I should see a {string} confirmation message', async function (confirmationText) {
    const confirmationElement = await this.driver.wait(until.elementLocated(By.xpath(`//h2[contains(text(), '${confirmationText}')] | //div[contains(text(), '${confirmationText}')]`)), 10000);
    expect(await confirmationElement.isDisplayed()).to.be.true;

    // Clean up the modal for the next potential test
    const okButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'OK')]")), 10000);
    await okButton.click();
});