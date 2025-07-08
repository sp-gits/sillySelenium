import { Builder , By } from "selenium-webdriver";
import { expect } from "chai";

describe('Verify Selenium form', function () {
    let driver;

    // Write a Selenium script to launch Chrome
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should verify the title and URL after clicking link', async function () {
        
    //Navigate to example.com.
        await driver.get('https://example.com');

    // Validate that the page title is "Example Domain".
   		let title = await driver.getTitle();
    		expect(title).to.equal("Example Domain");
    //Click on the More information… Button(here link)
        let link = await driver.findElement(By.css('a'));
            await link.click();
    // validating new link 
        let currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).to.include('iana.org');
    // close the browser
        after(async function () {
            await driver.quit();
        });

    });
});
