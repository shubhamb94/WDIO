const blaze = require('../pageobjects/Blazeeter/blazemeter')

describe('Blametere page', function(){

    it('product list', async function() {

        await browser.url('https://www.blazemeter.com/');
        await browser.maximizeWindow();

        //await blaze.elementText;
        await blaze.productList;
     
     
    });

});