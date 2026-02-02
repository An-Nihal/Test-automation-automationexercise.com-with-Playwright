import { test, expect } from '../fixtures/fixtures';

test.describe('Navigation Tests', () => {

    // Test Case 7: Verify Test Cases Page
    test('Test Case 7: Verify Test Cases Page', async ({ homePage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click on 'Test Cases' button
        await homePage.clickTestCases();

        // 4. Verify user is navigated to test cases page successfully
        await expect(page).toHaveURL(/.*test_cases/);
        await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();
    });
});
