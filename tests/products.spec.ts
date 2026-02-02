import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Product Tests', () => {

    // Test Case 8: Verify All Products and product detail page
    test('Test Case 8: Verify All Products and product detail page', async ({ homePage, productsPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click on 'Products' button
        await homePage.clickProducts();

        // 4. Verify user is navigated to ALL PRODUCTS page successfully
        await expect(page).toHaveURL(/.*products/);
        await expect(productsPage.allProductsHeader).toBeVisible();

        // 5. The products list is visible
        await expect(productsPage.allProducts).toBeVisible();
        const productCount = await productsPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);

        // 6. Click on 'View Product' of first product
        await productsPage.viewProduct(0);

        // 7. User is landed to product detail page
        await expect(page).toHaveURL(/.*product_details/);

        // 8. Verify that detail is visible: product name, category, price, availability, condition, brand
        await productsPage.verifyProductDetailsVisible();
    });

    // Test Case 9: Search Product
    test('Test Case 9: Search Product', async ({ homePage, productsPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click on 'Products' button
        await homePage.clickProducts();

        // 4. Verify user is navigated to ALL PRODUCTS page successfully
        await expect(page).toHaveURL(/.*products/);
        await expect(productsPage.allProductsHeader).toBeVisible();

        // 5. Enter product name in search input and click search button
        const searchQuery = 'T-Shirt';
        await productsPage.searchProduct(searchQuery);

        // 6. Verify 'SEARCHED PRODUCTS' is visible
        await expect(productsPage.searchedProductsHeader).toBeVisible();

        // 7. Verify all the products related to search are visible
        const productCount = await productsPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
        
        // Verify products contain search term
        const products = page.locator('.product-image-wrapper');
        const count = await products.count();
        for (let i = 0; i < count; i++) {
            const productText = await products.nth(i).textContent();
            // Products should be related to T-Shirt
            expect(productText?.toLowerCase()).toContain('shirt');
        }
    });

    // Test Case 21: Add review on product
    test('Test Case 21: Add review on product', async ({ homePage, productsPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click on 'Products' button
        await homePage.clickProducts();

        // 4. Verify user is navigated to ALL PRODUCTS page successfully
        await expect(page).toHaveURL(/.*products/);

        // 5. Click on 'View Product' button
        await productsPage.viewProduct(0);

        // 6. Verify 'Write Your Review' is visible
        await expect(productsPage.writeReviewHeader).toBeVisible();

        // 7. Enter name, email and review
        // 8. Click 'Submit' button
        await productsPage.submitReview(
            'Test Reviewer',
            'reviewer@example.com',
            'This is an excellent product! Great quality and fast delivery.'
        );

        // 9. Verify success message 'Thank you for your review.'
        await expect(productsPage.reviewSuccessMessage).toBeVisible();
        await expect(productsPage.reviewSuccessMessage).toContainText('Thank you for your review');
    });

    // Test Case 20: Search Products and Verify Cart After Login (original test)
    test('Test Case 20: Search Products and Verify Cart After Login', async ({ homePage, productsPage, cartPage, authPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Click on 'Products' button
        await homePage.clickProducts();

        // 3. Verify user is navigated to ALL PRODUCTS page successfully
        await expect(page).toHaveURL(/.*products/);

        // 4. Enter product name in search input and click search button
        const searchQuery = 'T-Shirt';
        await productsPage.searchProduct(searchQuery);

        // 5. Verify 'SEARCHED PRODUCTS' is visible
        await expect(productsPage.searchedProductsHeader).toBeVisible();

        // 6. Verify all the products related to search are visible
        const productCount = await productsPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);

        // 7. Add those products to cart
        await productsPage.addProductToCart(0);
        await productsPage.clickContinueShopping();

        // Add another if available
        if (productCount > 1) {
            await productsPage.addProductToCart(1);
            await productsPage.clickContinueShopping();
        }

        // 8. Click 'Cart' button and verify that products are visible in cart
        await homePage.clickCart();
        await expect(page).toHaveURL(/.*view_cart/);

        // 9. Click 'Signup / Login' button and submit login details
        await homePage.clickSignupLogin();
        
        // Register a new user for this test
        const email = `test_search_cart_${Date.now()}@example.com`;
        await authPage.registerUser(testData.user.name, email, testData.user);
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();

        // 10. Again, go to Cart page
        await homePage.clickCart();

        // 11. Verify that those products are visible in cart after login as well
        await expect(page).toHaveURL(/.*view_cart/);
        await cartPage.verifyProductInCart('shirt'); // Case-insensitive partial match

        // Cleanup - delete account
        await homePage.clickDeleteAccount();
        await expect(page.getByText('Account Deleted!')).toBeVisible();
    });
});
