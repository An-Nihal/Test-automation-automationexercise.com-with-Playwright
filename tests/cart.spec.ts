import { test, expect } from '../fixtures/fixtures';

test.describe('Cart Tests', () => {

    // Test Case 12: Add Products in Cart
    test('Test Case 12: Add Products in Cart', async ({ homePage, productsPage, cartPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click 'Products' button
        await homePage.clickProducts();

        // 4. Hover over first product and click 'Add to cart'
        await productsPage.addProductToCart(0);

        // 5. Click 'Continue Shopping' button
        await productsPage.clickContinueShopping();

        // 6. Hover over second product and click 'Add to cart'
        await productsPage.addProductToCart(1);

        // 7. Click 'View Cart' button
        await productsPage.clickViewCart();

        // 8. Verify both products are added to Cart
        await expect(page).toHaveURL(/.*view_cart/);
        const cartProductCount = await cartPage.getCartProductCount();
        expect(cartProductCount).toBe(2);

        // 9. Verify their prices, quantity and total price
        // Get product row details
        const productRows = page.locator('#cart_info_table tbody tr');
        
        // First product
        const firstProductPrice = await productRows.nth(0).locator('.cart_price p').textContent();
        const firstProductQuantity = await productRows.nth(0).locator('.cart_quantity button').textContent();
        const firstProductTotal = await productRows.nth(0).locator('.cart_total_price').textContent();
        
        expect(firstProductPrice).toBeTruthy();
        expect(firstProductQuantity).toBe('1');
        expect(firstProductTotal).toBeTruthy();

        // Second product
        const secondProductPrice = await productRows.nth(1).locator('.cart_price p').textContent();
        const secondProductQuantity = await productRows.nth(1).locator('.cart_quantity button').textContent();
        const secondProductTotal = await productRows.nth(1).locator('.cart_total_price').textContent();
        
        expect(secondProductPrice).toBeTruthy();
        expect(secondProductQuantity).toBe('1');
        expect(secondProductTotal).toBeTruthy();
    });

    // Test Case 13: Verify Product quantity in Cart
    test('Test Case 13: Verify Product quantity in Cart', async ({ homePage, productsPage, cartPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click 'View Product' for any product on home page
        await homePage.viewProductOnHomePage(0);

        // 4. Verify product detail is opened
        await expect(page).toHaveURL(/.*product_details/);

        // 5. Increase quantity to 4
        await productsPage.setQuantity(4);

        // 6. Click 'Add to cart' button
        await productsPage.clickAddToCart();

        // 7. Click 'View Cart' button
        await page.getByRole('link', { name: 'View Cart' }).click();

        // 8. Verify that product is displayed in cart page with exact quantity
        await expect(page).toHaveURL(/.*view_cart/);
        const quantity = await page.locator('.cart_quantity button').textContent();
        expect(quantity).toBe('4');
    });

    // Test Case 17: Remove Products From Cart
    test('Test Case 17: Remove Products From Cart', async ({ homePage, productsPage, cartPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Add products to cart
        await homePage.clickProducts();
        await productsPage.addProductToCart(0);
        await productsPage.clickContinueShopping();

        // 4. Click 'Cart' button
        await homePage.clickCart();

        // 5. Verify that cart page is displayed
        await expect(page).toHaveURL(/.*view_cart/);
        
        // Get initial cart count
        const initialCount = await cartPage.getCartProductCount();
        expect(initialCount).toBeGreaterThan(0);

        // 6. Click 'X' button corresponding to particular product
        // Get the name of the product to remove
        const productNameElement = page.locator('#cart_info_table tbody tr').first().locator('.cart_description h4 a');
        const productName = await productNameElement.textContent() || '';

        // Click the remove button
        await page.locator('#cart_info_table tbody tr').first().locator('.cart_quantity_delete').click();

        // 7. Verify that product is removed from the cart
        await page.waitForTimeout(1000); // Wait for animation
        
        // Verify the cart is now empty or the product is removed
        if (initialCount === 1) {
            // Cart should be empty
            await expect(cartPage.emptyCartMessage).toBeVisible();
        } else {
            // Product should be removed
            await cartPage.verifyProductRemoved(productName);
        }
    });

    // Test Case 22: Add to cart from Recommended items
    test('Test Case 22: Add to cart from Recommended items', async ({ homePage, cartPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Scroll to bottom of page
        await homePage.scrollToBottom();

        // 4. Verify 'RECOMMENDED ITEMS' are visible
        await expect(homePage.recommendedItemsHeader).toBeVisible();

        // 5. Click on 'Add To Cart' on Recommended product
        await homePage.addRecommendedItemToCart();

        // 6. Click on 'View Cart' button
        await page.getByRole('link', { name: 'View Cart' }).click();

        // 7. Verify that product is displayed in cart page
        await expect(page).toHaveURL(/.*view_cart/);
        const cartProductCount = await cartPage.getCartProductCount();
        expect(cartProductCount).toBeGreaterThan(0);
    });
});
