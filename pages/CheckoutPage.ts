import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    readonly addressDetails: Locator;
    readonly reviewOrder: Locator;
    readonly commentTextArea: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addressDetails = page.locator('#address_delivery');
        this.reviewOrder = page.locator('#cart_info');
        this.commentTextArea = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }

    async verifyAddressDetails(details: any) {
        await expect(this.addressDetails).toContainText(details.address);
        await expect(this.addressDetails).toContainText(details.city);
    }

    async enterComment(comment: string) {
        await this.commentTextArea.fill(comment);
    }

    async clickPlaceOrder() {
        await this.clickAndWait(this.placeOrderButton);
    }
}
