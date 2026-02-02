import { test, expect } from '../fixtures/fixtures';

test.describe('Brand Tests', () => {

    // Test Case 19: View & Cart Brand Products
    test('Test Case 19: View & Cart Brand Products', async ({ homePage, productsPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Click on 'Products' button
        await homePage.clickProducts();

        // 3. Verify that Brands are visible on left side bar
        await productsPage.verifyBrandsVisible();

        // 4. Click on any brand name (e.g., Polo)
        await productsPage.clickBrand('Polo');

        // 5. Verify that user is navigated to brand page and brand products are displayed
        await expect(page).toHaveURL(/.*brand_products\/Polo/);
        await expect(page.getByRole('heading', { name: /Brand.*Polo/i })).toBeVisible();
        
        // Verify products are displayed
        const productCount = await productsPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);

        // 6. On left side bar, click on any other brand link (e.g., H&M)
        await productsPage.clickBrand('H&M');

        // 7. Verify that user is navigated to that brand page and can see products
        await expect(page).toHaveURL(/.*brand_products\/H&M/i);
        await expect(page.getByRole('heading', { name: /Brand.*H&M/i })).toBeVisible();
        
        // Verify products are displayed for the new brand
        const newProductCount = await productsPage.getProductCount();
        expect(newProductCount).toBeGreaterThan(0);
    });
});
