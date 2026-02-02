import { test, expect } from '../fixtures/fixtures';

test.describe('Subscription Tests', () => {

    // Test Case 10: Verify Subscription in home page
    test('Test Case 10: Verify Subscription in home page', async ({ homePage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Scroll down to footer
        await homePage.scrollToFooter();

        // 4. Verify text 'SUBSCRIPTION'
        await expect(homePage.subscriptionHeader).toBeVisible();
        await expect(homePage.subscriptionHeader).toContainText('Subscription');

        // 5. Enter email address in input and click arrow button
        const testEmail = `test_subscription_${Date.now()}@example.com`;
        await homePage.subscribe(testEmail);

        // 6. Verify success message 'You have been successfully subscribed!' is visible
        await expect(homePage.subscriptionSuccessMessage).toBeVisible();
        await expect(homePage.subscriptionSuccessMessage).toContainText('You have been successfully subscribed!');
    });

    // Test Case 11: Verify Subscription in Cart page
    test('Test Case 11: Verify Subscription in Cart page', async ({ homePage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click 'Cart' button
        await homePage.clickCart();

        // 4. Scroll down to footer
        await homePage.scrollToFooter();

        // 5. Verify text 'SUBSCRIPTION'
        await expect(homePage.subscriptionHeader).toBeVisible();
        await expect(homePage.subscriptionHeader).toContainText('Subscription');

        // 6. Enter email address in input and click arrow button
        const testEmail = `test_subscription_cart_${Date.now()}@example.com`;
        await homePage.subscribe(testEmail);

        // 7. Verify success message 'You have been successfully subscribed!' is visible
        await expect(homePage.subscriptionSuccessMessage).toBeVisible();
        await expect(homePage.subscriptionSuccessMessage).toContainText('You have been successfully subscribed!');
    });
});
