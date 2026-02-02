import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly signupLoginButton: Locator;
    readonly productsButton: Locator;
    readonly cartButton: Locator;
    readonly loggedInUser: Locator;
    readonly deleteAccountButton: Locator;
    readonly contactUsButton: Locator;
    readonly testCasesButton: Locator;
    readonly subscriptionHeader: Locator;
    readonly subscriptionEmailInput: Locator;
    readonly subscriptionSubmitButton: Locator;
    readonly subscriptionSuccessMessage: Locator;
    readonly categorySection: Locator;
    readonly recommendedItemsHeader: Locator;
    readonly scrollUpArrow: Locator;
    readonly heroText: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginButton = page.getByRole('link', { name: ' Signup / Login' });
        this.productsButton = page.getByRole('link', { name: ' Products' });
        this.cartButton = page.getByRole('link', { name: 'Cart' });
        this.loggedInUser = page.locator('text=Logged in as');
        this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' });
        this.contactUsButton = page.getByRole('link', { name: ' Contact us' });
        this.testCasesButton = page.getByRole('link', { name: ' Test Cases' });
        this.subscriptionHeader = page.locator('.single-widget h2');
        this.subscriptionEmailInput = page.locator('#susbscribe_email');
        this.subscriptionSubmitButton = page.locator('#subscribe');
        this.subscriptionSuccessMessage = page.locator('.alert-success.alert');
        this.categorySection = page.locator('.left-sidebar');
        this.recommendedItemsHeader = page.getByText('recommended items', { exact: false });
        this.scrollUpArrow = page.locator('#scrollUp');
        this.heroText = page.getByText('Full-Fledged practice website for Automation Engineers');
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

    async clickContactUs() {
        await this.contactUsButton.click();
    }

    async clickTestCases() {
        await this.testCasesButton.click();
    }

    async scrollToFooter() {
        await this.subscriptionHeader.scrollIntoViewIfNeeded();
    }

    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async scrollToTop() {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }

    async subscribe(email: string) {
        await this.subscriptionEmailInput.fill(email);
        await this.subscriptionSubmitButton.click();
    }

    async verifyCategoriesVisible() {
        await expect(this.categorySection).toBeVisible();
    }

    async clickCategory(mainCategory: string, subCategory: string) {
        // Click on main category to expand
        await this.page.locator(`.panel-heading a[href*="${mainCategory.toLowerCase()}"]`).click();
        // Click on sub-category
        await this.page.locator(`#${mainCategory} a`).filter({ hasText: subCategory }).click();
    }

    async clickWomenCategory(subCategory: string) {
        await this.page.locator('a[href="#Women"]').click();
        await this.page.locator('#Women a').filter({ hasText: subCategory }).click();
    }

    async clickMenCategory(subCategory: string) {
        await this.page.locator('a[href="#Men"]').click();
        await this.page.locator('#Men a').filter({ hasText: subCategory }).click();
    }

    async scrollToRecommendedItems() {
        await this.recommendedItemsHeader.scrollIntoViewIfNeeded();
    }

    async addRecommendedItemToCart() {
        const recommendedProduct = this.page.locator('#recommended-item-carousel .add-to-cart').first();
        await recommendedProduct.click();
    }

    async clickScrollUpArrow() {
        await this.scrollUpArrow.click();
    }

    async viewProductOnHomePage(index: number) {
        await this.page.locator('.features_items .choose a[href*="product_details"]').nth(index).click();
    }
}

