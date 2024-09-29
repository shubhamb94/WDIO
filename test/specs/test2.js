describe('netflix page', ()=> {

    it('netflix login', async() => {

        await browser.url('https://www.netflix.com');
        await browser.maximizeWindow();
        const signin = await $("//a[@role='button']");
        await signin.click();
     
        const email = await $("//input[@autocomplete='email']");
        await email.setValue('9380911913');

        const pass = await $("//input[@autocomplete='password']");
        await pass.setValue('Optimusprime@94');

        const signinButton = await $("//button[@data-uia='login-submit-button']");
        await signinButton.click();

        await browser.pause(5000);


    });

});