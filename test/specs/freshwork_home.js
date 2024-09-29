const homepage = require("../pageobjects/freshworks/homepage")

describe('Freshwork',  function() {

    it('homepage', async function(){

        await browser.url('https://www.freshworks.com/');
        await browser.maximizeWindow();

        const header = homepage.pageHeader.getText();
        console.log(header)

        console.log(homepage.pageDec.getText());

        homepage.resource.click();

        await browser.pause(5000);


    });

});

