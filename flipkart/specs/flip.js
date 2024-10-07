describe("Flipkart Mobile Purchase", () => {

    before(async () => {
        await browser.url('https://www.flipkart.com/');
        await browser.maximizeWindow();

        // Close the login pop-up if it appears
        const closeLoginPopup = await $('button._2KpZ6l._2doB4z');
        if (await closeLoginPopup.isDisplayed()) {
            await closeLoginPopup.click();
        }
    });

    it("Search and Add Mobile to Cart", async function() {
        // Search for a mobile phone
        const searchBar = await $('input[name="q"]');
        await searchBar.waitForDisplayed({timeout: 10000});
        await searchBar.setValue('await browser.execute("arguments[0].scrollIntoView();", addBtm);');

        const searchButton = await $('button[type="submit"]');
        await searchButton.waitForDisplayed({timeout: 10000});
        await searchButton.click();

        // Wait for results to load and scroll to the first product
        await browser.pause(3000); // Give it some time to load results
        const firstProduct = await $('//div[contains(text(), "OPPO K12x 5G")]');
        await firstProduct.waitForDisplayed({timeout: 10000});
        await browser.execute("arguments[0].scrollIntoView();", firstProduct);

        // Click on the product to go to the product page
        await firstProduct.click();

        // Switch to new tab (as clicking opens product in new tab)
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);

        // Click on 'Add to Cart' button
        const addToCartButton = await $('//button[normalize-space()="Add to cart"]');
        await addToCartButton.waitForDisplayed({timeout: 10000});
        await addToCartButton.click();
    });

    it("Place Order", async function() {
        // Click on 'Place Order' button
        const placeOrderButton = await $('//button[normalize-space()="Place Order"]');
        await placeOrderButton.waitForDisplayed({timeout: 10000});
        await placeOrderButton.click();

        // Further steps would include login, address selection, and payment, 
        // which you can automate similarly if you have test credentials.
    });

    after(async () => {
        await browser.deleteSession();  // Clean up after tests
    });

});
