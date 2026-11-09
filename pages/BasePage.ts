import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path: string) {
        await this.page.goto(path);
    }

    async getTitle() {
        return await this.page.title();
    }

    async waitForUrl(url: string) {
        await this.page.waitForURL(url);
    }

    async clickAndWait(locator: Locator) {
        await locator.click();
        // If the click started a navigation, wait until the new page has finished loading
        // (returns immediately when the page was already loaded and nothing navigated)
        await this.page.waitForLoadState('load');
    }

    async clickAndWaitForUrl(locator: Locator, urlPattern: string | RegExp) {
        await locator.click();
        // waitForURL resolves on the 'load' event, so page scripts are ready afterwards
        await this.page.waitForURL(urlPattern);
    }
}
