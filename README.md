# DemoBlaze E-Commerce Automation Suite 🎯

A professional **BDD (Behavior-Driven Development)** automation testing suite for the [DemoBlaze](https://www.demoblaze.com/) e-commerce platform. Built with **Cucumber.js** and **Selenium WebDriver** to ensure robust, maintainable, and scalable test automation.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen)](https://nodejs.org/)
[![Cucumber](https://img.shields.io/badge/Cucumber-v10-red)](https://cucumber.io/)
[![Selenium](https://img.shields.io/badge/Selenium-v4.15-green)](https://www.selenium.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---


---

## ✨ Features

### Comprehensive Test Coverage
- **User Signup** - Account creation with unique credentials
- **Product Filtering** - Category-based product filtering and selection
- **Shopping Cart** - Add/remove items and manage cart contents
- **Checkout & Purchase** - Complete end-to-end purchase flow

### Professional Testing Stack
- ✅ **BDD Framework**: Gherkin syntax for readable, business-aligned test scenarios
- ✅ **Selenium WebDriver 4.15**: Cross-browser compatible automation
- ✅ **Cucumber.js 10**: Feature-file driven testing
- ✅ **Chai Assertions**: Fluent, readable test assertions
- ✅ **Screenshot Capture**: Automatic failure screenshots for debugging
- ✅ **Dynamic Test Data**: Unique usernames/timestamps to prevent test conflicts

### Robust Test Implementation
- Explicit waits and element locators
- JavaScript execution for complex interactions
- Modal and alert handling
- Stale element prevention
- Comprehensive error handling

---

## 📁 Project Structure

```
TheDemoBlaze/
├── features/                          # Gherkin feature files (BDD scenarios)
│   ├── 01_signup.feature             # User account creation tests
│   ├── 02_login.feature              # Product filtering & shopping
│   ├── 03_shopping.feature           # Cart management tests
│   ├── 04_cart.feature               # End-to-end checkout journey
│   └── 05_checkout.feature           # Empty (ready for expansion)
│
├── step_definitions/                  # Step implementation files
│   ├── signupSteps.js                # Signup step implementations
│   ├── loginSteps.js                 # Filter/product steps
│   ├── shoppingSteps.js              # Cart management steps
│   ├── cartSteps.js                  # Checkout process steps
│   └── checkoutSteps.js              # Checkout hook (ready for expansion)
│
├── support/                           # Test infrastructure
│   └── hooks.js                      # Before/After hooks, screenshot capture
│
├── package.json                       # Project dependencies & scripts
├── package-lock.json                  # Dependency lock file
├── .gitignore                         # Git ignore rules
├── LICENSE                            # MIT License
└── README.md                          # This file
```

---




## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/prathamji02/TheDemoBlaze.git
cd TheDemoBlaze
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- `@cucumber/cucumber` - BDD testing framework
- `selenium-webdriver` - Browser automation
- `chai` - Assertion library

### 3. Verify Installation
```bash
npm test  # Runs the test suite
```

---

## ⚙️ Configuration




### Test Data
Dynamic test data is generated using timestamps to ensure test isolation:

```javascript
const loggedInUser = {
    username: `e2euser_${Date.now()}`,
    password: 'password123'
};
```

---

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Feature
```bash
npx cucumber-js features/01_signup.feature --require step_definitions/*.js --require support/*.js
```



### Test Output Example
```
4 scenarios (4 passed)
22 steps (22 passed)
0m32.315s (executing steps: 0m32.196s)
```

---



## 🏗 Project Architecture

### BDD Approach with Cucumber

**Feature Files** (Business Language)
```gherkin
Scenario: Successful Signup with New Credentials
  Given I am on the Demoblaze homepage
  When I click the "Sign up" navigation link
  And I enter a unique username and password "Pass123!"
  And I click the "Sign up" button in the modal
  Then I should see the alert "Sign up successful."
```

**Step Definitions** (Technical Implementation)
```javascript
Given('I am on the Demoblaze homepage', async function () {
    await this.driver.get('https://www.demoblaze.com/');
});
```

### World Context Pattern
All tests use `CustomWorld` class for maintaining driver state:

```javascript
class CustomWorld {
    constructor() {
        this.driver = null;
    }
}
setWorldConstructor(CustomWorld);
```

### Hooks for Setup/Teardown
- **Before**: Initializes browser and window
- **After**: Closes browser gracefully
- **AfterStep**: Captures screenshots on failure

---

## ✅ Best Practices Implemented

### 1. **Element Interaction**
- ✅ JavaScript execution for reliable clicks
- ✅ Explicit waits instead of implicit waits
- ✅ Retry logic for stale element references

```javascript
await this.driver.executeScript("arguments[0].click();", element);
```

### 2. **Wait Strategies**
- ✅ WebDriverWait for element visibility
- ✅ Alert presence checks
- ✅ Dynamic delays for modal transitions

### 3. **Test Data Management**
- ✅ Dynamic credentials (timestamp-based)
- ✅ Unique user generation to prevent conflicts
- ✅ Direct product navigation using IDs

### 4. **Error Handling**
- ✅ Automatic screenshot capture on failures
- ✅ Meaningful error messages
- ✅ Graceful test cleanup

### 5. **Code Organization**
- ✅ Single responsibility principle
- ✅ Reusable step definitions
- ✅ Clear separation of concerns
- ✅ DRY (Don't Repeat Yourself) principles

### 6. **Maintainability**
- ✅ Descriptive step names
- ✅ Inline code comments
- ✅ Consistent naming conventions
- ✅ Version control ready

---


## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Free to use, modify, and distribute with attribution.
```

---

## 👤 Author

**Pratham Garg**
- 📧 Email: pratham.garg2801@gmail.com
- 🔗 GitHub: [@yourgithubname](https://github.com/prathamji02)

---



**Last Updated**: March 30, 2026  
**Version**: 1.0.0
