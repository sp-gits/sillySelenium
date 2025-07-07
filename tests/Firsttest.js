
import { Builder, By, until } from "selenium-webdriver";
import { expect } from 'chai';

describe('First Test', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('First selenium test', async () => {
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    let title = await driver.getTitle();
    expect(title).to.equal("Web form");

    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));

    await textBox.sendKeys('Selenium');
    await submitButton.click();

    // ✅ Wait up to 5 seconds for the message element to contain text
    let messageElement = await driver.wait(
      until.elementLocated(By.id('message')),
      5000
    );
    
    // ✅ Also wait for its text to be "Received!"
    await driver.wait(until.elementTextIs(messageElement, "Received!"), 5000);

    let message = await messageElement.getText();
    expect(message).to.equal("Received!");
  });

  after(async () => {
//    await driver.sleep(5000);
    await driver.quit();
  });
});
