import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartTable: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.cartTable = page.locator('#cart_info_table');
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
        this.emptyCartMessage = page.locator('#empty_cart');
    }

    async verifyProductInCart(productName: string) {
        await expect(this.cartTable).toContainText(productName);
    }

    async verifyProductQuantity(productName: string, expectedQuantity: string) {
        const productRow = this.page.locator('tr').filter({ hasText: productName });
        await expect(productRow.locator('.cart_quantity button')).toHaveText(expectedQuantity);
    }

    async verifyProductPrice(productName: string, expectedPrice: string) {
        const productRow = this.page.locator('tr').filter({ hasText: productName });
        await expect(productRow.locator('.cart_price p')).toContainText(expectedPrice);
    }

    async verifyTotalPrice(productName: string, expectedTotal: string) {
        const productRow = this.page.locator('tr').filter({ hasText: productName });
        await expect(productRow.locator('.cart_total p')).toContainText(expectedTotal);
    }

    async removeProduct(productName: string) {
        const productRow = this.page.locator('tr').filter({ hasText: productName });
        await productRow.locator('.cart_quantity_delete').click();
    }

    async verifyProductRemoved(productName: string) {
        await expect(this.page.locator('tr').filter({ hasText: productName })).not.toBeVisible();
    }

    async getCartProductCount() {
        return await this.page.locator('#cart_info_table tbody tr').count();
    }

    async verifyCartIsEmpty() {
        await expect(this.emptyCartMessage).toBeVisible();
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}

