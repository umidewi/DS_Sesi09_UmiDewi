const { $, expect } = require('@wdio/globals')
const Page = require('./page');

class LoginPage extends Page {
    // NOTE: elements collection
    get fieldUsername () { return $('#user-name'); }
    get fieldPassword () { return $('#password'); }
    get buttonLogin () { return $('#login-button'); }
    get errorLockedOutUser () { return $('//h3[text()="Epic sadface: Sorry, this user has been locked out."]') }
    get errorInvalidUserPass () { return $('//h3[text()="Epic sadface: Username and password do not match any user in this service"]') }
    get errorEmptyUsername () { return $('//h3[text()= "Epic sadface: Username is required"]') }
    get errorEmptyPassword () { return $('//h3[text()= "Epic sadface: Password is required"]') }

    async login (username, password) {
        await this.fieldUsername.waitForDisplayed({ timeout: 2500 });
        await this.fieldUsername.setValue(username);
        await this.fieldPassword.setValue(password);
        await this.buttonLogin.click();
    }

    //Validation for locked out user
    async validateLockedOutUserError () {
        await this.errorLockedOutUser.waitForDisplayed({ timeout: 2500 });
        await expect(this.errorLockedOutUser).toBeDisplayed()
    }

    //Validation for Invalid Username or Password
    async validateInvalidUserPass () {
        await this.errorInvalidUserPass.waitForDisplayed({ timeout: 2500 });
        await expect(this.errorInvalidUserPass).toBeDisplayed()
    }

    //Validation for Empty Username
    async validateEmptyUsername () {
        await this.errorEmptyUsername.waitForDisplayed({ timeout: 2500 });
        await expect(this.errorEmptyUsername).toBeDisplayed()
    }

    //Validation for Empty Password
    async validateEmptyPassword () {
        await this.errorEmptyPassword.waitForDisplayed({ timeout: 2500 });
        await expect(this.errorEmptyPassword).toBeDisplayed()
    }

    open () {
        return super.open('/'); // NOTE: will open https://www.saucedemo.com/
    }
}

module.exports = new LoginPage();