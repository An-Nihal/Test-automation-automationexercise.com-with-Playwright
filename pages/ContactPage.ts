import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageTextarea: Locator;
    readonly uploadFileInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly getInTouchHeader: Locator;
    readonly homeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.locator('input[data-qa="name"]');
        this.emailInput = page.locator('input[data-qa="email"]');
        this.subjectInput = page.locator('input[data-qa="subject"]');
        this.messageTextarea = page.locator('textarea[data-qa="message"]');
        this.uploadFileInput = page.locator('input[name="upload_file"]');
        this.submitButton = page.locator('input[data-qa="submit-button"]');
        this.successMessage = page.locator('.status.alert.alert-success');
        this.getInTouchHeader = page.getByText('Get In Touch');
        this.homeButton = page.locator('.btn.btn-success');
    }

    async fillContactForm(name: string, email: string, subject: string, message: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextarea.fill(message);
    }

    async uploadFile(filePath: string) {
        await this.uploadFileInput.setInputFiles(filePath);
    }

    async submitForm() {
        // Handle the dialog that appears
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
        await this.submitButton.click();
    }

    async clickHome() {
        await this.homeButton.click();
    }
}
