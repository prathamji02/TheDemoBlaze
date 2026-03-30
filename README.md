# DemoBlaze E-Commerce Automation Suite 🎯

A professional **BDD (Behavior-Driven Development)** automation testing suite for the [DemoBlaze](https://www.demoblaze.com/) e-commerce platform. Built with **Cucumber.js** and **Selenium WebDriver** to ensure robust, maintainable, and scalable test automation.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen)](https://nodejs.org/)
[![Cucumber](https://img.shields.io/badge/Cucumber-v10-red)](https://cucumber.io/)
[![Selenium](https://img.shields.io/badge/Selenium-v4.15-green)](https://www.selenium.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Test Results](#-test-results)
- [Project Architecture](#-project-architecture)
- [Best Practices](#-best-practices)
- [Contributing](#-contributing)
- [License](#-license)

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

## 🛠 Prerequisites

- **Node.js** v18.0 or higher
- **npm** v8.0 or higher  
- **Microsoft Edge** or **Chrome** browser installed
- **Windows**, **Mac**, or **Linux** operating system

### Verify Installation
```bash
node --version    # Should show v18+
npm --version     # Should show v8+
```

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/TheDemoBlaze.git
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

### Browser Configuration
Current setup uses **Microsoft Edge** browser. To switch to Chrome, edit `support/hooks.js`:

```javascript
// Change this:
this.driver = await new Builder().forBrowser('MicrosoftEdge').build();

// To this:
this.driver = await new Builder().forBrowser('chrome').build();
```

### Timeout Settings
All tests use **10-15 second explicit waits**. Adjust in step files if needed:

```javascript
await this.driver.wait(until.elementLocated(By.id('element-id')), 10000); // 10 seconds
```

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

### Run with Tags (future enhancement)
```bash
npx cucumber-js --tags "@smoke" features/ --require step_definitions/ --require support/
```

### Test Output Example
```
4 scenarios (4 passed)
22 steps (22 passed)
0m32.315s (executing steps: 0m32.196s)
```

---

## 📊 Test Results

### Current Test Suite: ✅ ALL PASSING

| Feature | Scenario | Status | Duration |
|---------|----------|--------|----------|
| Signup | Successful account creation | ✅ Pass | 7.5s |
| Shopping | Filter products & add to cart | ✅ Pass | 8.2s |
| Cart | Add and delete items | ✅ Pass | 8.1s |
| Checkout | Complete purchase flow | ✅ Pass | 8.5s |

**Overall Results:**
- ✅ **4/4 scenarios passed** (100%)
- ✅ **22/22 steps passed** (100%)
- 📸 **Failure screenshots** captured automatically

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

## 📝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/new-test-scenario
   ```
3. **Add your feature file** in `features/`
4. **Implement step definitions** in `step_definitions/`
5. **Ensure all tests pass**
   ```bash
   npm test
   ```
6. **Commit with clear messages**
   ```bash
   git commit -m "Add: New test scenario for feature X"
   ```
7. **Push and create a Pull Request**

### Testing Your Changes
Before pushing, verify:
- ✅ All tests pass: `npm test`
- ✅ No console errors
- ✅ Screenshots captured for failures (in root directory)
- ✅ No hardcoded values

---

## 🔧 Troubleshooting

### Tests Timeout
**Issue**: Steps fail with "function timed out" error

**Solutions**:
- Increase wait timeout in step definition
- Check internet connectivity
- Verify DemoBlaze website is accessible
- Check browser driver compatibility

### Element Not Found
**Issue**: Cannot locate element on page

**Solutions**:
- Use browser DevTools to inspect element
- Update XPath or CSS selector
- Ensure page has fully loaded before interaction
- Check for dynamic element IDs

### Stale Element Reference
**Issue**: "stale element not found" error

**Solutions**:
- Refetch element before clicking
- Add delay between steps: `await new Promise(r => setTimeout(r, 500))`
- Use `executeScript` for clicks instead of `.click()`

---

## 📚 Learning Resources

- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Selenium WebDriver API](https://www.selenium.dev/documentation/)
- [Chai Assertion Library](https://www.chaijs.com/api/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Free to use, modify, and distribute with attribution.
```

---

## 👤 Author

**Pratham Garg**
- 📧 Email: [Your Email]
- 🔗 GitHub: [@yourgithubname](https://github.com/yourgithubname)
- 💼 LinkedIn: [Your LinkedIn Profile]

---

## 🙏 Acknowledgments

- [DemoBlaze](https://www.demoblaze.com/) - Test automation website
- [Cucumber](https://cucumber.io/) - BDD framework
- [Selenium Project](https://www.selenium.dev/) - Browser automation

---

## ⭐ Show Your Support

If you found this project helpful, please give it a star! 🌟

---

**Last Updated**: March 30, 2026  
**Version**: 1.0.0
