import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartTable: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartTable = page.locator('#cart_info_table');
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
    }

    async verifyProductInCart(productName: string) {
        await expect(this.cartTable).toContainText(productName);
    }
}
