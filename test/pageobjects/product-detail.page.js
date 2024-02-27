const { $, expect } = require('@wdio/globals')
const Page = require('./page');

class ProductDetailPage extends Page {
   // get productBackpack () { return $('#inventory_details_img')} //get element image
    get productBackpackPrice () { return $('//*[text()="$" or text()="29.99"]')}


    get secondaryTitle() {
        return $('#header_container > div.header_secondary_container > span')
    }

    async validateProductDetailPage() {
       //  await expect(this.productBackpack).toBeDisplayed()
         await expect(this.productBackpackPrice).toBeDisplayed()
    }

    open () {
        return super.open('/inventory-item.html?id=4');
    }
}

module.exports = new ProductDetailPage();