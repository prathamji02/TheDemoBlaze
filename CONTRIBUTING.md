# Contributing to DemoBlaze Automation Suite

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🎯 How to Contribute

### 1. Report Bugs
- Check if the bug has already been reported in [Issues](../../issues)
- Create a new issue with a clear title and detailed description
- Include steps to reproduce the issue
- Attach screenshots or test logs if relevant

**Bug Report Template:**
```
**Describe the bug:**
Brief description of what the bug is.

**To Reproduce:**
1. Step 1
2. Step 2
3. Expected behavior
4. Actual behavior

**Environment:**
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Edge/Firefox]
- Node Version: [e.g., 18.0.0]
```

### 2. Suggest Enhancements
- Clearly describe the enhancement and use case
- Explain why this enhancement would be useful
- Include any relevant examples or mockups

### 3. Submit Pull Requests
Follow the workflow below to submit code contributions.

---

## 🔄 Development Workflow

### Step 1: Fork the Repository
```bash
# Click "Fork" on GitHub repository page
git clone https://github.com/your-username/TheDemoBlaze.git
cd TheDemoBlaze
```

### Step 2: Create a Feature Branch
```bash
# Create branch from main
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b bugfix/issue-description
```

**Branch Naming Convention:**
- Features: `feature/short-description`
- Bugs: `bugfix/issue-description`
- Docs: `docs/update-readme`
- Tests: `test/new-scenario`

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Make Your Changes
- Write your new feature or fix
- Follow the coding standards (see below)
- Ensure tests pass: `npm test`

### Step 5: Commit Changes
```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "Add: New test scenario for checkout flow"
```

**Commit Message Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `Add:` - New feature or test
- `Fix:` - Bug fix
- `Update:` - Update existing code
- `Refactor:` - Code refactoring
- `Docs:` - Documentation changes
- `Style:` - Code style changes
- `Test:` - Test additions or fixes

**Examples:**
```
Add: New test scenario for payment processing
Fix: Timeout issue in cart deletion step
Update: Improve product selection XPath
Docs: Add setup instructions for Linux
```

### Step 6: Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### Step 7: Create Pull Request
1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill in the PR template (see below)
4. Submit the pull request

---

## 📋 Pull Request Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Test addition

## Related Issues
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] All tests pass locally (`npm test`)
- [ ] Added new tests for this feature
- [ ] No breaking changes

## Screenshots (if applicable)
Add screenshots of new UI changes or test results

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented complex logic
- [ ] Tests pass successfully
- [ ] No console errors or warnings
```

---

## 📐 Coding Standards

### Project Structure
```
features/            → Feature files (Gherkin)
step_definitions/    → Step implementations (JavaScript)
support/             → Test hooks and utilities
```

### Step Definition Guidelines

**Good Example:**
```javascript
Given('I am a logged-in user', async function () {
    // Clear, descriptive step name
    await this.driver.get('https://www.demoblaze.com/');
    
    // Inline comments for complex logic
    const signupButton = await this.driver.wait(
        until.elementLocated(By.id('signin2')), 
        10000  // 10 second wait
    );
    
    // Use executeScript for reliable interactions
    await this.driver.executeScript("arguments[0].click();", signupButton);
});
```

**Code Style Rules:**
- Use `async/await` for asynchronous operations
- Use `executeScript` for clicks on problematic elements
- Always use **explicit waits** (10-15 seconds)
- Add comments for non-obvious logic
- Use descriptive variable names
- Keep steps focused and single-purpose

### Feature File Guidelines

**Good Example:**
```gherkin
Feature: User Checkout Process
  As a customer
  I want to complete my purchase
  So that I can own the product

  Scenario: Successful purchase with valid details
    Given I am a logged-in user
    And I have added "Sony vaio i5" to my cart
    When I view the cart and proceed to "Place Order"
    And I fill out the purchase modal with my details
    Then I should see a "Thank you for your purchase!" confirmation message
```

**Writing Style:**
- Use clear, business-friendly language
- Start with `Given` (preconditions), `When` (actions), `Then` (results)
- Each scenario should be independently runnable
- Avoid technical jargon

---

## 🧪 Testing Requirements

### Before Submitting a PR:
1. **Run all tests**
   ```bash
   npm test
   ```

2. **Verify all scenarios pass**
   - ✅ Signup feature
   - ✅ Shopping feature
   - ✅ Cart feature
   - ✅ Checkout feature

3. **Check for console errors**
   - No error messages in output

4. **Verify screenshot capture**
   - Failure screenshots are created (if applicable)

### Adding New Tests:
1. Create feature file in `features/`
2. Implement steps in appropriate `step_definitions/` file
3. Follow existing naming patterns
4. Ensure independent test data (use timestamps)
5. Test both success and failure paths

---

## 📝 Documentation Guidelines

### Updating README
- Keep sections clear and concise
- Update table of contents if adding sections
- Include code examples for new features
- Test all code snippets before submitting

### Updating Comments
- Explain "why", not "what"
- Use clear, professional language
- Keep comments concise
- Update comments when code changes

---

## 🚀 Performance Considerations

- Don't increase wait timeouts unnecessarily
- Use direct navigation when possible (e.g., product IDs)
- Avoid redundant element searches
- Clean up browser resources in After hooks

---

## 🔍 Code Review Process

Our maintainers will:
1. Check code against guidelines
2. Run the test suite
3. Provide constructive feedback
4. Request changes if needed (in comments)

**You should be prepared to:**
- Respond to feedback promptly
- Make requested changes
- Re-submit the PR if needed

---

## 📞 Questions or Need Help?

- Check existing [Issues](../../issues) and [Pull Requests](../../pulls)
- Comment on relevant discussions
- Reach out to maintainers for guidance

---

## 🙏 Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct:
- Be respectful and inclusive
- Provide constructive feedback
- Accept criticism gracefully
- Focus on code quality and improvement

---

## ✨ Recognition

Contributors will be recognized in:
- README.md Contributors section
- GitHub contributors page
- Release notes

---

Thank you for contributing to make this project better! 🌟
