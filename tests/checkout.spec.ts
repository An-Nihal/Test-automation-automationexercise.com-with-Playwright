import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Checkout Tests', () => {

    test('Place Order: Register while Checkout', async ({ homePage, productsPage, cartPage, authPage, checkoutPage, paymentPage, page }) => {
        const email = `test_checkout_${Date.now()}@example.com`;

        // 1. Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Add product to cart
        await homePage.clickProducts();
        await productsPage.searchProduct('T-Shirt');
        await productsPage.addProductToCart(0);
        await page.getByRole('link', { name: 'View Cart' }).click();

        // 3. Verify cart page and click Proceed To Checkout
        await expect(page).toHaveURL(/.*view_cart/);
        await cartPage.proceedToCheckoutButton.click();

        // 4. Click 'Register / Login' button (Popup modal 'Register / Login' account)
        await page.getByRole('link', { name: 'Register / Login' }).click();

        // 5. Register User
        await authPage.registerUser(testData.user.name, email, testData.user);
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();

        // 6. Verify 'Logged in as username'
        await expect(homePage.loggedInUser).toBeVisible();

        // 7. Click 'Cart' button
        await homePage.clickCart();

        // 8. Click 'Proceed To Checkout' button
        await cartPage.proceedToCheckoutButton.click();

        // 9. Verify Address Details and Review Your Order
        await checkoutPage.verifyAddressDetails(testData.user);

        // 10. Enter description in comment text area and click 'Place Order'
        await checkoutPage.enterComment('Test Order');
        await checkoutPage.clickPlaceOrder();

        // 11. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await paymentPage.fillPaymentDetails('Test Name', '1234567890123456', '123', '12', '2025');

        // 12. Click 'Pay and Confirm Order' button
        await paymentPage.submitPayment();

        // 13. Verify success message 'Your order has been placed successfully!'
        await expect(paymentPage.orderPlacedSuccessMessage).toBeVisible(); // This selector in page object is text match "Order Placed!"

        // 14. Delete Account
        await page.getByRole('link', { name: 'Delete Account' }).click(); // Selector on home page or any after login, but using page locator here or can use homePage method if available globally or navigate
        // Since homePage is available:
        // await homePage.clickDeleteAccount(); 
        // But payment success page might have different structure. Assuming standard header.
        // Actually, usually it redirects or shows a page. "Delete Account" is usually in the navbar.
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });
});
