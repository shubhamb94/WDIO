
describe("Amazon login", () => {

    before(async () => {
        await browser.url('https://www.amazon.in');
    });

    it("search", async () =>  {

        //await browser.setTimeout({ 'pageLoad': 120000 });  
        // Maximize the browser window
       await browser.maximizeWindow();

        const search = await $('input#twotabsearchtextbox');
        await search.setValue('macbook');

        const searchButton = await $('input#nav-search-submit-button');
        await searchButton.click();

        const label = await $('span.a-truncate-cut:nth-child(2)');
        let text = await label.getText();
        console.log(text);
        
        await browser.pause(5000);
        //await browser.debug();
        
        
    });

    it('click on image', async() => {
        await browser.maximizeWindow();

        const search = await $('input#twotabsearchtextbox');
        await search.setValue('macbook');

        const searchButton = await $('input#nav-search-submit-button');
        await searchButton.click();

        const image = await $("//img[@class='_bGlmZ_lifestyleImage_3B0SG']");
        await image.click();
        await browser.pause(5000);


    });

    after(async () => {

        await browser.deleteSession();
    });

});
