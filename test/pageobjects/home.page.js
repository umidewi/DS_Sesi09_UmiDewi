const { $, expect } = require('@wdio/globals')
const Page = require('./page');

class HomePage extends Page {
    get iconCart () { return $('.shopping_cart_link'); }
    get productBackpack () { return $('#item_4_img_link')}

    async validateHomePage() {
        await expect(browser).toHaveUrlContaining('/inventory.html')
        await expect(this.iconCart).toBeDisplayed()
    }

    async validateProductDetails() {
        await expect(this.productBackpack).toBeDisplayed()
        await this.productBackpack.click()
        await expect(browser).toHaveUrlContaining('/inventory-item.html?id=4')
    }

    open () {
        return super.open('/inventory.html');
    }
}

module.exports = new HomePage();