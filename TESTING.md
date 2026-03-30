# Testing Documentation

## 📊 Overview

This document provides comprehensive information about the test suite structure, how to write tests, and best practices.

---

## 🗂️ Test Suite Structure

### Feature Files
Location: `features/`

Each feature file contains Gherkin scenarios that describe business requirements:

| File | Focus | Scenarios |
|------|-------|-----------|
| `01_signup.feature` | User registration | Account creation with unique credentials |
| `02_login.feature` | Product discovery | Filter by category, add to cart |
| `03_shopping.feature` | Cart management | Add items, remove items, verify totals |
| `04_cart.feature` | Complete checkout | Register, login, add items, purchase |
| `05_checkout.feature` | Reserved for expansion | - |

### Step Definitions
Location: `step_definitions/`

JavaScript files implementing the Gherkin steps:

| File | Purpose |
|------|---------|
| `signupSteps.js` | User registration & modal interactions |
| `loginSteps.js` | Product filtering & selection |
| `shoppingSteps.js` | Cart operations & management |
| `cartSteps.js` | Login flow & checkout process |
| `checkoutSteps.js` | Reserved for expansion |

### Support Files
Location: `support/`

Infrastructure and utilities:

| File | Purpose |
|------|---------|
| `hooks.js` | Before/After test hooks, screenshot capture |

---

## 🎤 Writing Features (Gherkin)

### Feature File Structure

```gherkin
Feature: User can complete a purchase
  As a customer
  I want to buy products
  So that I can receive them

  Background:
    # Optional: Common setup for all scenarios
    Given I am on the DemoBlaze homepage

  Scenario: Successful order placement
    # Preconditions - the setup
    Given I am a logged-in user
    And I have added "Sony vaio i5" to my cart
    
    # Actions - user interactions
    When I view the cart and proceed to "Place Order"
    And I fill out the purchase modal with my details
    
    # Results - expected outcomes
    Then I should see a "Thank you for your purchase!" confirmation message
```

### Gherkin Keywords

| Keyword | Purpose | Example |
|---------|---------|---------|
| `Feature` | Test suite title | Feature: User Registration |
| `Scenario` | Individual test | Scenario: New user signup |
| `Given` | Precondition/setup | Given I am on the homepage |
| `When` | Action/trigger | When I click the signup button |
| `Then` | Expected result/assertion | Then I should see a success message |
| `And` | Additional step | And I enter my password |
| `But` | Negative step | But the error message appears |
| `Background` | Common setup for all scenarios | - |
| `Scenario Outline` | Parameterized tests | Scenario Outline: Login (future) |

### Best Practices for Feature Files

✅ **DO:**
```gherkin
# Clear business language
Scenario: Customer adds item to cart
  Given I have searched for "Samsung S6"
  When I click the search result
  And I click "Add to cart"
  Then the item is added to my cart
```

❌ **DON'T:**
```gherkin
# Technical jargon
Scenario: XPath search and DOM click
  Given element by id 'searchbox' is visible
  When JavaScript click is executed
  And waitForElement timeout is set to 10s
  Then cart count increments
```

---

## 💻 Writing Step Definitions (JavaScript)

### Step Definition Template

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');

// Setup
Given('I am on the homepage', async function () {
    // 'this' refers to the World object containing this.driver
    await this.driver.get('https://www.demoblaze.com/');
});

// Action
When('I click the {string} button', async function (buttonText) {
    // {string} captures the parameter in the step
    const button = await this.driver.wait(
        until.elementLocated(By.xpath(`//button[text()='${buttonText}']`)),
        10000  // 10 second timeout
    );
    await this.driver.executeScript("arguments[0].click();", button);
});

// Assertion
Then('I should see {string} message', async function (expectedText) {
    const element = await this.driver.wait(
        until.elementLocated(By.xpath(`//*[contains(text(), '${expectedText}')]`)),
        10000
    );
    expect(await element.isDisplayed()).to.be.true;
});
```

### Parameter Types

#### String Parameter
```gherkin
When I click the "Sign up" button
```
```javascript
When('I click the {string} button', async function (buttonText) {
    // buttonText = "Sign up"
});
```

#### Multiple Parameters
```gherkin
When I enter username "john" and password "secret123"
```
```javascript
When('I enter username {string} and password {string}', async function (user, pass) {
    // user = "john"
    // pass = "secret123"
});
```

---

## 🔍 Locating Elements

### Recommended Selectors (in order of preference)

#### 1. ID
```javascript
By.id('username')  // <input id="username" />
```

#### 2. CSS Selector
```javascript
By.css('.btn-primary')  // <button class="btn-primary"></button>
```

#### 3. XPath
```javascript
// For text content
By.xpath(`//a[text()='Products']`)  // <a>Products</a>

// For partial matches
By.xpath(`//a[contains(text(), 'Product')]`)  // <a>Product List</a>

// For classes
By.xpath(`//button[@class='btn']`)  // <button class="btn"></button>

// For parent navigation
By.xpath(`//td[text()='Item']/following-sibling::td/a[text()='Delete']`)
```

### Inspector Tips
Press `F12` in browser to:
- Right-click element → "Inspect"
- Open DevTools Console
- Copy element selectors
- Verify locators in real-time

---

## ⏱️ Handling Waits

### Explicit Waits (Recommended)

```javascript
// Wait for element to be visible
const element = await this.driver.wait(
    until.elementLocated(By.id('element-id')),
    10000  // milliseconds
);

// Wait for element visibility
const element = await this.driver.wait(
    until.elementIsVisible(element),
    10000
);

// Wait for alert
await this.driver.wait(until.alertIsPresent(), 10000);

// Wait for element invisibility (element disappears)
await this.driver.wait(
    until.elementIsNotVisible(element),
    5000
);
```

### Implicit Delays
```javascript
// For modal transitions or page loads
await new Promise(resolve => setTimeout(resolve, 500));  // 500ms
```

### Common Conditions
```javascript
until.elementLocated(locator)           // Element is in DOM
until.elementIsVisible(element)         // Element is displayed
until.elementIsNotVisible(element)      // Element is hidden
until.alertIsPresent()                  // Alert dialog appears
until.titleIs(expectedTitle)            // Page title matches
until.urlContains(substring)            // URL contains string
```

---

## 🪟 Handling Modals & Dialogs

### JavaScript Alerts
```javascript
// Wait for alert to appear
await this.driver.wait(until.alertIsPresent(), 10000);

// Get alert text
const alert = await this.driver.switchTo().alert();
const text = await alert.getText();

// Accept alert
await alert.accept();

// Dismiss alert
await alert.dismiss();

// Send text to prompt
await alert.sendKeys('some text');
```

### Bootstrap Modals (HTML)
```javascript
// Check if modal is visible
const modal = await this.driver.findElement(By.id('modalId'));
await this.driver.wait(
    until.elementIsVisible(modal),
    5000
);

// Wait for modal to close
await this.driver.wait(
    until.elementIsNotVisible(modal),
    5000
);
```

---

## 🎯 Interacting with Elements

### Typing Text
```javascript
// Clear and type (recommended)
const input = await this.driver.wait(until.elementLocated(By.id('email')), 10000);
await input.clear();
await input.sendKeys('user@example.com');

// Using JavaScript (more reliable)
await this.driver.executeScript("arguments[0].value = arguments[1];", input, 'user@example.com');
```

### Clicking Elements
```javascript
// Standard click
const button = await this.driver.wait(until.elementLocated(By.id('btn')), 10000);
await button.click();

// JavaScript click (for hidden/overlay elements)
await this.driver.executeScript("arguments[0].click();", button);

// Scroll into view then click
await this.driver.executeScript("arguments[0].scrollIntoView(true);", button);
await button.click();
```

### Selecting Options
```javascript
const select = require('selenium-webdriver').Select;

const dropdown = await this.driver.findElement(By.id('country'));
const selectElement = new select(dropdown);

// By visible text
await selectElement.selectByVisibleText('India');

// By value
await selectElement.selectByValue('IN');

// By index
await selectElement.selectByIndex(2);
```

### Form Filling Example
```javascript
Given('I fill the checkout form', async function () {
    const nameField = await this.driver.wait(until.elementLocated(By.id('name')), 10000);
    const emailField = await this.driver.wait(until.elementLocated(By.id('email')), 10000);
    
    await this.driver.executeScript("arguments[0].value = arguments[1];", nameField, 'John Doe');
    await this.driver.executeScript("arguments[0].value = arguments[1];", emailField, 'john@example.com');
});
```

---

## ✅ Assertions & Verifications

### Chai Assertions

```javascript
const { expect } = require('chai');

// Text content
expect(text).to.equal('Expected Text');
expect(text).to.include('substring');

// Boolean checks
expect(isDisplayed).to.be.true;
expect(isEnabled).to.be.false;

// Array checks
expect([1, 2, 3]).to.include(2);
expect(elements.length).to.equal(5);

// Comparison
expect(price).to.be.greaterThan(100);
expect(price).to.be.lessThan(500);

// Existence
expect(element).to.exist;
expect(value).to.not.be.null;

// Custom messages
expect(actualText, 'User greeting message should match').to.equal(expectedText);
```

### Element Verification

```javascript
// Check if element is displayed
const isDisplayed = await element.isDisplayed();
expect(isDisplayed).to.be.true;

// Check if element is enabled
const isEnabled = await element.isEnabled();
expect(isEnabled).to.be.true;

// Get element text
const text = await element.getText();
expect(text).to.equal('Expected Text');

// Get element attribute
const href = await link.getAttribute('href');
expect(href).to.include('/products');

// Get computed style
const color = await element.getCssValue('color');
expect(color).to.include('rgb');
```

---

## 🔄 Test Data Management

### Using World Context to Share Data

```javascript
// In signupSteps.js - store credentials
Given('I am a new user', async function () {
    this.testUser = {
        username: `user_${Date.now()}`,
        password: 'Password123!'
    };
    // ... signup logic
});

// In cartSteps.js - use shared data
Given('I am a logged-in user', async function () {
    // Reuse this.testUser
    const username = this.testUser.username;
    // ... login logic
});
```

### Dynamic Test Data
```javascript
// Generate unique usernames to avoid conflicts
const timestamp = Date.now();
const uniqueUsername = `testuser_${timestamp}`;

// Generate unique emails
const uniqueEmail = `test_${timestamp}@example.com`;

// Generate timestamps for order IDs
const orderId = `ORD_${Date.now()}`;
```

---

## 🐛 Debugging Tests

### Using Console Output
```javascript
When('I debug this step', async function () {
    console.log('Current URL:', await this.driver.getCurrentUrl());
    console.log('Page title:', await this.driver.getTitle());
});
```

### Pausing Execution
```javascript
// For debugging - pauses for 60 seconds to inspect browser
await this.driver.sleep(60000);
```

### Checking Page Source
```javascript
const pageSource = await this.driver.getPageSource();
console.log(pageSource);
```

### Taking Screenshots
```javascript
const screenshot = await this.driver.takeScreenshot();
const fs = require('fs');
fs.writeFileSync('debug_screenshot.png', screenshot, 'base64');
```

---

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Single Feature
```bash
npx cucumber-js features/01_signup.feature --require step_definitions/*.js --require support/*.js
```

### Run with Verbose Output
```bash
npx cucumber-js features/ --require step_definitions/ --require support/ --format progress
```

### Run with Parallel Execution (Future)
```bash
npx cucumber-js features/ --parallel 4 --require step_definitions/ --require support/
```

---

## 📊 Test Results Interpretation

### Successful Test Run
```
✔ 4 scenarios (4 passed)
✔ 22 steps (22 passed)
⏱ 0m32.315s (executing steps: 0m32.196s)
```

### Failed Test Run
```
✖ 2 scenarios (1 failed, 1 passed)
✖ 8 steps (1 failed, 3 skipped, 4 passed)
```

**Exit Codes:**
- `0` = All tests passed
- `1` = One or more tests failed

---

## 📝 Test Report Example

```
Feature: End-to-End Checkout
  Scenario: Complete user journey from login to purchase
    √ Before                                           # support/hooks.js:17
    √ Given I am a logged-in user                      # step_definitions\cartSteps.js:14
    √ And I have added "Sony vaio i5" to my cart      # step_definitions\cartSteps.js:56
    √ When I view the cart and proceed to "Place Order" # step_definitions\cartSteps.js:69
    √ And I fill out the purchase modal with my details # step_definitions\cartSteps.js:75
    ✖ And I click the "Purchase" button (click error)
    - Then I should see a success message              # step_definitions\cartSteps.js:100
    √ After                                            # support/hooks.js:31
```

---

## 🎓 Common Test Scenarios

### Example 1: Login Test
```gherkin
Scenario: User logs in with valid credentials
  Given I am on the DemoBlaze homepage
  When I filter by the "Laptops" category
  And I click on the "Sony vaio i5" product
  And I click the "Add to cart" button
  Then I should see a "Product added." confirmation alert
```

### Example 2: Data Validation
```gherkin
Scenario: Cart total updates when item added
  Given I am a logged-in user
  When I add an item with price 500 to cart
  Then the cart total should be updated to 500
```

### Example 3: Error Handling
```gherkin
Scenario: User sees error on invalid payment
  Given I have entered invalid credit card details
  When I click the "Place Order" button
  Then I should see the error "Invalid card number"
```

---

## 🔗 Related Resources

- [Cucumber.js Docs](https://cucumber.io/docs/cucumber/)
- [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/)
- [Chai Assertions](https://www.chaijs.com/api/)
- [Best Practices](../README.md#-best-practices-implemented)

---

**Version:** 1.0.0  
**Last Updated:** March 30, 2026
