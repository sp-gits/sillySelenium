import { Builder, By, until } from "selenium-webdriver";
import { expect } from "chai";

describe('Verify Selenium form', function () {
    this.timeout(30000); // set timeout per test
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();

        // Resize to mobile view so hamburger menu appears
        await driver.manage().window().setRect({ width: 375, height: 812 });
    });

    it('should verify login flow and top navigation links', async function () {
        // Step 1: Open the login page
        await driver.get('https://practicetestautomation.com/practice-test-login/');

        // Step 2: Enter credentials and submit
        await driver.findElement(By.id("username")).sendKeys("student");
        await driver.findElement(By.id("password")).sendKeys("Password123");
        await driver.findElement(By.id("submit")).click();

        // Step 3: Wait for URL to change
        await driver.wait(until.urlContains('logged-in-successfully'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include("logged-in-successfully");

        // Step 4: Check the success message
        const messageElement = await driver.findElement(By.className('post-title'));
        const messageText = await messageElement.getText();
        expect(messageText).to.equal("Logged In Successfully");

        // Step 5: Click the hamburger menu to reveal nav links
    const toggleButton = await driver.findElement(By.id('toggle-navigation'));
    await toggleButton.click();
    await driver.sleep(1000); // allow mobile nav animation to complete

// Step 6: Wait for the nav links to appear
await driver.wait(until.elementLocated(By.css("a[href='https://practicetestautomation.com/practice/']")), 5000);

// Step 7: Assert the navigation links are visible
    const expectedLinks = {
    Practice: 'https://practicetestautomation.com/practice/',
    Courses: 'https://practicetestautomation.com/courses/',
    Blog: 'https://practicetestautomation.com/blog/',
    Contact: 'https://practicetestautomation.com/contact/',
    };

for (const [linkText, linkHref] of Object.entries(expectedLinks)) {
    const link = await driver.findElement(By.css(`a[href='${linkHref}']`));
    expect(await link.isDisplayed(), `${linkText} link not visible after menu opened`).to.be.true;
}


        // Step 8: Close mobile nav menu using JavaScript (avoid intercepted click)
await driver.executeScript(`
  document.getElementById('mobile-menu-container').classList.remove('open');
  document.getElementById('toggle-navigation').classList.remove('open');
  document.getElementById('toggle-navigation').setAttribute('aria-expanded', 'false');
`);
await driver.sleep(500); // give time to close visually

// Step 9: Scroll and click logout
const logoutButton = await driver.findElement(By.linkText("Log out"));
await driver.executeScript("arguments[0].scrollIntoView(true);", logoutButton);
await logoutButton.click();

// Step 10: Verify return to login page
await driver.wait(until.urlContains('practice-test-login'), 5000);
const logoutUrl = await driver.getCurrentUrl();
expect(logoutUrl).to.include('practice-test-login');


    after(async function () {
        await driver.quit(); // Close the browser
    });
});
});
