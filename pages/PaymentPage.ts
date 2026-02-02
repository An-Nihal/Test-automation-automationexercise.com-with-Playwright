import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expirationMonthInput: Locator;
    readonly expirationYearInput: Locator;
    // readonly payAndConfirmIcon: Locator; // Removed as unused
    readonly submitButton: Locator;
    readonly orderPlacedSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.nameOnCardInput = page.locator('input[name="name_on_card"]');
        this.cardNumberInput = page.locator('input[name="card_number"]');
        this.cvcInput = page.locator('input[name="cvc"]');
        this.expirationMonthInput = page.locator('input[name="expiry_month"]');
        this.expirationYearInput = page.locator('input[name="expiry_year"]');
        this.submitButton = page.locator('#submit');
        // Success message might be on next page or same
        this.orderPlacedSuccessMessage = page.getByText('Order Placed!'); // or usually a header
    }

    async fillPaymentDetails(name: string, number: string, cvc: string, month: string, year: string) {
        await this.nameOnCardInput.fill(name);
        await this.cardNumberInput.fill(number);
        await this.cvcInput.fill(cvc);
        await this.expirationMonthInput.fill(month);
        await this.expirationYearInput.fill(year);
    }

    async submitPayment() {
        await this.clickAndWait(this.submitButton);
    }
}
