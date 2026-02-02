import { test, expect } from '../fixtures/fixtures';

test.describe('Scroll Tests', () => {

    // Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
    test('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality', async ({ homePage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Scroll down page to bottom
        await homePage.scrollToBottom();

        // 4. Verify 'SUBSCRIPTION' is visible
        await expect(homePage.subscriptionHeader).toBeVisible();
        await expect(homePage.subscriptionHeader).toContainText('Subscription');

        // 5. Click on arrow at bottom right side to move upward
        await homePage.clickScrollUpArrow();

        // 6. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
        await page.waitForTimeout(1000); // Wait for scroll animation
        await expect(homePage.heroText).toBeVisible();
    });

    // Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality
    test('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', async ({ homePage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Scroll down page to bottom
        await homePage.scrollToBottom();

        // 4. Verify 'SUBSCRIPTION' is visible
        await expect(homePage.subscriptionHeader).toBeVisible();
        await expect(homePage.subscriptionHeader).toContainText('Subscription');

        // 5. Scroll up page to top
        await homePage.scrollToTop();

        // 6. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
        await page.waitForTimeout(1000); // Wait for scroll animation
        await expect(homePage.heroText).toBeVisible();
    });
});
