import { test, expect } from '../fixtures/fixtures';

test.describe('Product & Cart Tests', () => {

    test('Search Product and Verify Cart After Login', async ({ homePage, productsPage, cartPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Click on 'Products' button
        await homePage.clickProducts();
        await expect(page).toHaveURL(/.*products/);

        // 3. Search for product
        await productsPage.searchProduct('T-Shirt');
        await expect(page.getByText('Searched Products')).toBeVisible();

        // 4. Add to cart
        // Note: 'T-Shirt' search might return multiple. Adding the first one.
        await productsPage.addProductToCart(0);

        // 5. Click 'View Cart' button (Popup usually appears)
        // Handling popup or clicking the link
        await page.getByRole('link', { name: 'View Cart' }).click();

        // 6. Verify product is displayed in cart page
        await expect(page).toHaveURL(/.*view_cart/);
        await cartPage.verifyProductInCart('T-Shirt');
    });
});
