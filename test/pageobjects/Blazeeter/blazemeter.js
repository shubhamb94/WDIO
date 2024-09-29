const { element } = require("wd/lib/element");

class Blazemeter {

    get parent() {  return $('ul.menu.menu-level-0:nth-child(3)'); }

    get childList() { return this.parent.$$('li'); }

    get elementText() {

        return this.childList.filter(element => {

            console.log(element.getText());
});

}

    get productsMain() { return $$("//ul[@id='tab-group-2441']/li/a/div/div");}

    get productList() {

        return this.productsMain.filter(element => {

            console.log(element.getText());
});
    }
         

}

module.exports = new Blazemeter();