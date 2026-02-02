import { test, expect } from '../fixtures/fixtures';
import path from 'path';

test.describe('Contact Us Tests', () => {

    // Test Case 6: Contact Us Form
    test('Test Case 6: Contact Us Form', async ({ homePage, contactPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click on 'Contact Us' button
        await homePage.clickContactUs();

        // 4. Verify 'GET IN TOUCH' is visible
        await expect(contactPage.getInTouchHeader).toBeVisible();

        // 5. Enter name, email, subject and message
        await contactPage.fillContactForm(
            'Test User',
            'testuser@example.com',
            'Test Subject',
            'This is a test message for contact form verification.'
        );

        // 6. Upload file
        const testFilePath = path.join(__dirname, '../data/testData.ts'); // Using an existing file as test upload
        await contactPage.uploadFile(testFilePath);

        // 7. Click 'Submit' button
        await contactPage.submitForm();

        // 8. Click OK button (handled in submitForm via dialog accept)

        // 9. Verify success message 'Success! Your details have been submitted successfully.' is visible
        await expect(contactPage.successMessage).toBeVisible();
        await expect(contactPage.successMessage).toContainText('Success! Your details have been submitted successfully.');

        // 10. Click 'Home' button and verify that landed to home page successfully
        await contactPage.clickHome();
        await expect(page).toHaveTitle(/Automation Exercise/);
        await expect(page).toHaveURL(/automationexercise\.com\/?$/);
    });
});
