import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly signupLoginButton: Locator;
    readonly productsButton: Locator;
    readonly cartButton: Locator;
    readonly loggedInUser: Locator;
    readonly deleteAccountButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginButton = page.getByRole('link', { name: ' Signup / Login' });
        this.productsButton = page.getByRole('link', { name: ' Products' }); // Note: icon might be part of text or separate, using text match for now
        this.cartButton = page.getByRole('link', { name: 'Cart' });
        this.loggedInUser = page.locator('text=Logged in as');
        this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' });
    }

    async visit() {
        await this.navigateTo('/');
    }

    async clickSignupLogin() {
        await this.signupLoginButton.click();
    }

    async clickProducts() {
        await this.productsButton.click();
        await this.page.waitForURL(/.*products/);
    }

    async clickCart() {
        await this.cartButton.click();
    }

    async clickDeleteAccount() {
        await this.deleteAccountButton.click();
    }

    async clickLogout() {
        await this.page.getByRole('link', { name: 'Logout' }).click();
    }
}
