class HomePage {


    get pageHeader() { return $('h1') }
    get pageDec() { return $("(//p[@class='sc-5159831f-0 sc-a469bc4a-2 tSOdx iZlOXf'])[1]")  }
    get resource() { return $('span#global-menu-item-2')}

}


module.exports = new HomePage();