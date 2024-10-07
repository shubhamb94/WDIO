const chai = require('chai');
const { element } = require('wd/lib/element');
const expect = chai.expect;


describe("Myntra", () => {

    before(async () => {
        await browser.url('https://www.myntra.com/');
        await browser.maximizeWindow();
    });

    it("selecting Gender", async function() {
        // Search for a mobile phone
        const searchBar = await $(`input[class="desktop-searchBar"]`);
        await searchBar.waitForDisplayed({timeout: 10000});
        await searchBar.setValue(`shirt`);

        const searchButton = await $(`a[class="desktop-submit"]`);
        await searchButton.waitForDisplayed({timeout: 10000});
        await searchButton.click();

        // const radioBtn = await $(`//label[normalize-space()='Men']`);
        // await radioBtn.waitForDisplayed(10000);
        // await radioBtn.click();
        // browser.pause(5000);

        const filterOpt = await $$(`//div[@class="vertical-filters-filters"]`); //we dont use wait for displayed for $$
        console.log(filterOpt.length);

        for (let i = 0; i < filterOpt.length; i++) {
            const ulElement = await filterOpt[i].$(`.//ul[contains(@class, "gender-list")]`);  // - .//ul - used to find rel xpath as it has contaons method so .// should be used
            if (ulElement) {  // Check if ulElement exists
                const isDisplayed = await ulElement.isDisplayed(); 
                if (isDisplayed) {
                    console.log("Found gender-list");
                    const genderList = await ulElement.$$(`li`);
                    console.log("Number of list items: ", genderList.length);
                    
                    if (genderList.length > 0) {
                        for (let j = 0; j < genderList.length; j++) {
                            console.log(await genderList[j].getText());  // Log each list item's text

                            const genderText = await genderList[j].getText();
                            console.log(genderText);
                            

                            if(genderText.trim() === "Men"){
                                console.log("men found");

                                const radioBtn = await genderList[j].$(`.//label[normalize-space()='Men']`); // normalize-space is used to find xpath by removing spaces it is helpful to find exact xpath
                                //.//- . is used to create rel xpath else // will create xpath from root and might fail in finding xpath

                                if(radioBtn.isExisting()){

                                    await radioBtn.waitForDisplayed(5000);
                                    await radioBtn.waitForEnabled(5000);

                                    await radioBtn.click();
                                    console.log("radio button selected for: ", genderText);

                                }
                            
                            }

                        }
                    } else {
                        console.log("No list items found");
                    }
                } else {
                    console.log("Not displayed");
                }
            } else {
                console.log("ulElement not found");
            }
        } 

        await browser.pause(5000); 
   
    });

   it("brand selection", async function() {

      const filterOpt = await $(`//div[contains(@class, "brand-container")]`);
      const filterBtn = await filterOpt.$(`.//div[contains(@class, "filter-search-filterSearchBox")]`);
      await filterBtn.waitForDisplayed(5000);
      await filterBtn.click();

      browser.pause(5000);
      
      const inputBox = await filterBtn.$(`.//input[@placeholder="Search for Brand"]`);
      await inputBox.waitForDisplayed(5000);
      await inputBox.setValue("allen");

      const brandOpt = await inputBox.$$(`.//ancestor::div[contains(@class, "filter-search-filterSearchBox")]//following-sibling::ul[contains(@class, "brand-list")]/li`);
      console.log(await brandOpt.length);

      for(let i=0;i<brandOpt.length;i++){

        const brandLabel = await brandOpt[i].$(`label`);
        //const labelElement = await $(`//label[contains(., 'Allen Solly')]`); - here . means current node and chcking if it contains allen solly so all list will return
//we use . for current node and // for root and contains is for checking
        const fullText = await brandLabel.getText();
        
        const brandName = await fullText.split('(')[0].trim();  // plit('(')[0].trim() - this will split into 2 string from '(' and retrive string of first place and later trim for any spaces
        console.log(brandName);
        
        
        if(brandName.trim() == "Allen Solly"){
            console.log("Allen solly found");

            const checkBox = await brandLabel.$(`.//div[@class="common-checkboxIndicator"]`);
            //const checkBox = await brandLabel[i];
            await checkBox.scrollIntoView();
            await checkBox.waitForDisplayed(10000);
            await checkBox.waitForClickable(10000);
            //await checkBox.click();
            await browser.execute((element) => element.click(), checkBox);
            await browser.waitUntil(
                async () => await checkBox.isSelected(),
                {
                    timeout: 5000,
                    timeoutMsg: 'Checkbox is not selected after clicking'
                }
            );
            console.log("checkbox clicked");
            //await browser.pause(5000);


            // console.log(expect(await checkBox.isSelected()).to.be.true);
            break;


        }

       
      }
      await browser.pause(5000);

    
   });

   it("Dress selection", async function() {

    const firstPage = await $(`//div[contains(@class, "search-searchProducts")]`);
    //const prodList1 = await firstPage.$$(`.//section/ul/li/div[@class="product-ratingsContainer"]/span`);
    //class="results-base"
    const prodList1 = await firstPage.$$(`.//section/ul[@class="results-base"]/li`);

    //div[contains(@class, "search-searchProducts")]/section/ul/li/div[@class="product-ratingsContainer"]
    console.log(prodList1.length);

    for(let i=0;i<prodList1.length;i++){

        //const rate = await prodList1[i].$(`.//div[@class="product-ratingsContainer"]`);

        const fullRate  = await prodList1[i].getText();
        //const fullRate  = await rate.getText();

        const prodRate = await fullRate.split('|')[0].trim();

        console.log(`Full rating: ${fullRate}, Extracted rating: ${prodRate}`);
        console.log(typeof prodRate);
       

        //console.log(prodRate);
        if(prodRate.trim() === "4.5"){

            const prodLink = await prodList1[i].$(`.//img[@class="img-responsive"]`);
            //const prodLink = await prodList1[i];
    
            if(prodLink){


            await prodLink.scrollIntoView({ block: 'center', inline: 'center' });
            await browser.waitUntil(
                async () => await prodLink.isClickable(),
                {
                    timeout: 5000,
                    timeoutMsg: 'Image is not clickable after 5s'
                }
            );
            await prodLink.click();
                console.log("Image clicked for product with rating 4.1");
                await browser.pause(5000);
                break;
         } else {
                console.log("Product link not found.");


            }

           // await prodLink.scrollIntoView();
            //await prodLink.waitForDisplayed(5000);
            // await prodLink.click();
            // console.log("image clicked");
            // await browser.pause(5000);
            // break;

        }
    }   
   });

   it("Add to cart", async function () {

    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);

    await browser.pause(10000);

    ////div[@class='size-buttons-size-buttons']//div[2]//div[1]//button

    const sizeOpt = await $$(`//div[@class='size-buttons-size-buttons']//div[2]//div[1]//button`);
    
    //const sizeOpt = await $$(`//div[@class="size-buttons-buttonContainer"]/button[not(contains(@class, "disabled"))]`);

    //div[@class="size-buttons-size-buttons"]/div[contains(@class, "size-buttons")]/div/button[contains(@class, "size-buttons-size-button-selected")]
    
    console.log("Sizes option: ", sizeOpt.length);

    for(let i=0; i<sizeOpt.length;i++){

        //const sizeBtn = await sizeOpt[i];
        
//div[@class='size-buttons-size-buttons']//div[2]//div[1]//button[1]


       // await sizeBtn.scrollIntoView();
        //await sizeBtn.waitForClickable(10000);

        // try {
        //     await sizeBtn.click(); // Attempt to click directly
        //     console.log("Size clicked successfully");
        //     await browser.pause(10000);
        //     break; // Exit loop after clicking
        // } catch (error) {
        //     console.error("Click failed, refetching element.", error);
        //     // Refetch the button in case it has changed
        //     const newSizeOpt = await $$(`div.size-buttons-buttonContainer button:not(.disabled)`);
        //     const newSizeBtn = newSizeOpt[i];
        //     await newSizeBtn.click(); // Try clicking the refetched element
        //     console.log("Size clicked successfully after refetch");
        //     await browser.pause(10000);
        //     break;
        // }

        if(await sizeOpt[i].isClickable()){


           
            await browser.execute((element)=> element.click(), sizeOpt[i]);
            //await sizeBtn.click();
            console.log("size clicked");
            await browser.pause(10000);

            break;
            
        }


    }  
    
   });

    after(async () => {
        await browser.deleteSession();  // Clean up after tests
    });

});


