
describe("flipkart", async function () {
    this.timeout(120000)
    
    before(async () => {
        await browser.url('https://www.flipkart.com/');
        await browser.maximizeWindow();
        
    });

    it("flipkart login", async function()  {
        this.timeout(90000);

        const searchBar = await $(`input[class="Pke_EE"]`);
        await searchBar.waitForDisplayed({timeout:10000});
        await searchBar.setValue('mobiles');


        const searchBtn = await $(`button[type="submit"]`);
        await searchBtn.waitForDisplayed({timeout:10000});
        await searchBtn.click();

        const mobileOpt = await $$(`//div[@class="DOjaWF YJG4Cf col-12-12"]/following-sibling::div`);

        console.log(mobileOpt.length);

        for(let i= 0;i<mobileOpt.length; i++) {

            const mobileText = await mobileOpt[i].$(`a[class="CGtC98"] div:nth-child(2) div.KzDlHZ`);  ///div[2]//div[@class="KzDlHZ"]`

            await mobileText.waitForDisplayed({timeout:10000});

            const text = await mobileText.getText();

            console.log("mobile text is: ", text);

            if(text === 'OPPO K12x 5G with 45W SUPERVOOC Charger In-The-Box (Feather Pink, 128 GB)') {
                await mobileOpt[i].click();
                console.log("text is: ", text);

                const windowHandles = await browser.getWindowHandles();
                await browser.switchToWindow(windowHandles[1]);
            
                //const addBtm = await $("//button[normalize-space()='Add to cart']");
               
                //await browser.pause({timeout:50000});
                
            
                // await addBtm.waitForDisplayed({timeout: 50000});
                // await browser.execute("arguments[0].scrollIntoView();", addBtm);
                // await addBtm.click();

                const addToCartButton = await $(`//ul[@class='row']/li/button`);
                //await browser.execute('arguments[0].scrillIntoVIew();', addToCartButton);
                //await browser.execute("arguments[0].scrollIntoView();", addToCartButton);
                await browser.waitUntil(async () => {
                    return (await addToCartButton.isDisplayed()) === true;
                }, {
                    timeout: 60000,
                    timeoutMsg: 'Add to Cart button not displayed after 20 seconds'
                });
                await browser.execute((element) => element.click(), addToCartButton)
                await browser.saveScreenshot('./error_screenshot.png');

                

                
        // await addToCartButton.waitForDisplayed({timeout: 10000});
        // await addToCartButton.click();
                
                //console.log("Add to cart button clicked.");
            
            

            // if(text === 'REDMI Note 13 Pro+ 5G (Fusion Black, 256 GB)' || text=='OPPO K12x 5G with 45W SUPERVOOC Charger In-The-Box (Feather Pink, 128 GB)'){

            //     await mobileOpt[i].click();
            //     console.log("text is: ", text);

            //     // const windowHandles = await browser.getWindowHandles();
            //     // await browser.switchToWindow(windowHandles[1]); // Switches to the second window
            //     const addBtm = await $(`//button[normalize-space()='Add to cart']`);
            //     await browser.execute("arguments[0].scrollIntoView();", addBtm);
            //     await addBtm.waitForDisplayed({timeout: 30000});
            //     await addBtm.click();
                

                // const addBtm = await $(`//button[normalize-space()='Add to cart']`);
                // await browser.execute("arguments[0].scrollIntoView();", addBtm);
                // await addBtm.waitForDisplayed({timeout: 40000});

                // if (await addBtm.isClickable()) {
                //     await addBtm.click();
                // } else {
                //     console.log('Button not clickable');
                // }
                
                //await addBtm.waitForDisplayed({timeout:30000});
                //await browser.execute("arguments[0].scrollIntoView();", addBtm);
                //await browser.execute((button) => button.click(), addBtm);

                //await addBtm.click();

            //     console.log("Add to cart button clicked.");
            //    // console.log(expect(isButtonClicked).toBe(true));

            
            //    const placeOrd = await $(`button[class*="QqFHMw"`);
            //    await placeOrd.waitForDisplayed({timeout: 30000});
            //    const placeText = await placeOrd.$(`span`);
            //     console.log(await placeText.getText());

            //     const loginField = await $(`input[class*="r4vIwl"]`);
            //     await loginField.waitForDisplayed({timeout:30000});
            //     await loginField.setValue('9380911913');

            //     const continueBtmn = await $(`button[class*="QqFHMw"]`);
            //     await continueBtmn.waitForDisplayed({timeout:30000});
            //     await continueBtmn.click();
               
                break;

            };

            
            //await browser.pause(50000);  


        };
         await browser.pause(10000);
         //await browser.debug();
 });
  

   after(async () => {
//     //if (browser.isActive()) { // Make sure the browser session is active
        await browser.deleteSession();
//     //}
   });
   

});
