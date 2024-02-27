const LoginPage = require('../pageobjects/login.page')
const HomePage = require('../pageobjects/home.page')
const productDetailPage = require('../pageobjects/product-detail.page')
var assert = require('assert');

describe('Swag Labs', () => {
    const productName = "Sauce Labs Backpack"

    //Negative Case for Login

    //1. Login use Locked Out Creadential
    it('Should Get Login Error with locked_out_user credentials', async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.USERNAME_LOCKED_OUT_USER, process.env.PASSWORD_SAUCEDEMO)
        await LoginPage.validateLockedOutUserError()
    })

    //2. Login use Invalid Username
    it('Should Get Login Error with invalid username', async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.USERNAME_INVALID, process.env.PASSWORD_SAUCEDEMO)
        await LoginPage.validateInvalidUserPass()
    })

    //3. Login use Invalid Password
    it('Should Get Login Error with invalid password', async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.USERNAME_STANDARD_USER, process.env.PASSWORD_INVALID)
        await LoginPage.validateInvalidUserPass()
    })

    //4. Login use Empty Username
    it('Should Get Login Error with empty username', async () => {
        await LoginPage.open()
        await LoginPage.login('', process.env.PASSWORD_SAUCEDEMO)
        await LoginPage.validateEmptyUsername()
    })

    //5. Login use Empty Password
    it('Should Get Login Error with empty password', async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.PASSWORD_SAUCEDEMO,'')
        await LoginPage.validateEmptyPassword()
    })

    //Positive Case for Login -> Checkout
    //6. Login use Standart User
    it('Should Success Login with standard_user credentials', async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.USERNAME_STANDARD_USER, process.env.PASSWORD_SAUCEDEMO)
        await HomePage.validateHomePage()
    })

    //7. Case Select Product
    it('Product - Select Product', async () => {
        const productsElement = await $$('div.inventory_item_name')

        for (const ele of productsElement) {
            if (await ele.getText() === productName) {
                await ele.click()
                break
            }
        }
        await browser.pause(1000)
    });

    //8. Case Add to Cart
    it('Product Details - Click Add to Cart', async () => {
        await $('#back-to-products').waitForClickable({ timeout: 3000 })
        const product = await $('.inventory_details_name').getText()
        assert.strictEqual(product, productName, "product name mismatch!")
        await $('button=Add to cart').click()
        await $('a.shopping_cart_link').click()
    });

    //9. Page Checkout
    it('Cart - Click Checkout', async () => {
        await browser.pause(1000)
        const title = await $('.title').getText()
        assert.strictEqual(title, "Your Cart")
        const product = await $('.inventory_item_name').getText()
        assert.strictEqual(product, productName)
        await $('#checkout').click()
    });

    //10. Page - Your Information
    it('Checkout - Fill Information', async () => {
        await browser.pause(1000)
        const title = await $('.title').getText()
        assert.strictEqual(title, "Checkout: Your Information")
        await $('#first-name').setValue('First')
        await $('#last-name').setValue('Last')
        await $('#postal-code').setValue('234567')
        await $('#continue').click()
    });

    //11. Page Chekout Overviw
    it('Checkout - Overview', async () => {
        await browser.pause(1000)
        const title = await $('.title').getText()
        assert.strictEqual(title, "Checkout: Overview")
        const product = await $('.inventory_item_name').getText()
        assert.strictEqual(product, productName)
        await $('#finish').click()
    });

    //12. Page Checkout Complete
    it('Checkout - Complete', async () => {
        await browser.pause(1000)
        const title = await $('.title').getText()
        assert.strictEqual(title, "Checkout: Complete!")
        const message = await $('h2.complete-header').getText()
        assert.strictEqual(message, "Thank you for your order!")
    });

    
    // it('should redirect to product detail when click product name', async () => {
    //     await LoginPage.open()
    //     await LoginPage.login(process.env.USERNAME_STANDARD_USER, process.env.PASSWORD_SAUCEDEMO)
    //     await HomePage.validateHomePage()
    //     await HomePage.validateProductDetails()
    //     await productDetailPage.validateProductDetailPage()
    // })

    
})