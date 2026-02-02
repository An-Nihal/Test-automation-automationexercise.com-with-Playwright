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
    }

    async clickAndWaitForUrl(locator: Locator, urlPattern: string | RegExp) {
        await locator.click();
        await this.page.waitForURL(urlPattern);
    }
}
