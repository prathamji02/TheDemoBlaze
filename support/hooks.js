const { Before, After, AfterStep, Status, setWorldConstructor } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const fs = require('fs');

// Define CustomWorld class
class CustomWorld {
    constructor() {
        this.driver = null;
    }
}

// Set the world constructor
setWorldConstructor(CustomWorld);

// IMPORTANT: Use a regular "function", NOT an arrow function "() =>"
// Arrow functions do not allow Cucumber to bind "this" to the World context.
Before(async function () {
    this.driver = await new Builder().forBrowser('MicrosoftEdge').build();
    await this.driver.manage().window().maximize();
});

AfterStep(async function (step) {
    if (step.result.status === Status.FAILED) {
        const screenshot = await this.driver.takeScreenshot();
        const fileName = `failure_${Date.now()}.png`;
        fs.writeFileSync(fileName, screenshot, 'base64');
        console.log(`\n📸 Failure captured: ${fileName}`);
    }
});

After(async function () {
    if (this.driver) {
        await this.driver.quit();
    }
});

module.exports = { CustomWorld };