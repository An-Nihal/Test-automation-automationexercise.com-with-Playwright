import { test, expect } from '../fixtures/fixtures';

test.describe('Category Tests', () => {

    // Test Case 18: View Category Products
    test('Test Case 18: View Category Products', async ({ homePage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that categories are visible on left side bar
        await homePage.verifyCategoriesVisible();

        // 3. Click on 'Women' category
        await homePage.clickWomenCategory('Dress');

        // 4. Verify that category page is displayed and confirm text 'WOMEN - DRESS PRODUCTS'
        await expect(page).toHaveURL(/.*category_products/);
        await expect(page.getByRole('heading', { name: /Women.*Dress/i })).toBeVisible();

        // 5. On left side bar, click on any sub-category link of 'Men' category
        await homePage.clickMenCategory('Tshirts');

        // 6. Verify that user is navigated to that category page
        await expect(page).toHaveURL(/.*category_products/);
        await expect(page.getByRole('heading', { name: /Men.*Tshirts/i })).toBeVisible();
    });
});
