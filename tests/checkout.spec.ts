import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';
import path from 'path';
import fs from 'fs';

test.describe('Checkout Tests', () => {

    // Test Case 14: Place Order: Register while Checkout
    test('Test Case 14: Place Order: Register while Checkout', async ({ homePage, productsPage, cartPage, authPage, checkoutPage, paymentPage, page }) => {
        const email = `test_checkout_while_${Date.now()}@example.com`;

        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Add products to cart
        await homePage.clickProducts();
        await productsPage.addProductToCart(0);
        await productsPage.clickViewCart();

        // 4. Verify that cart page is displayed
        await expect(page).toHaveURL(/.*view_cart/);

        // 5. Click Proceed To Checkout
        await cartPage.proceedToCheckoutButton.click();

        // 6. Click 'Register / Login' button
        await page.getByRole('link', { name: 'Register / Login' }).click();

        // 7. Fill all details in Signup and create account
        await authPage.registerUser(testData.user.name, email, testData.user);

        // 8. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();

        // 9. Verify 'Logged in as username' at top
        await expect(homePage.loggedInUser).toBeVisible();

        // 10. Click 'Cart' button
        await homePage.clickCart();

        // 11. Click 'Proceed To Checkout' button
        await cartPage.proceedToCheckoutButton.click();

        // 12. Verify Address Details and Review Your Order
        await checkoutPage.verifyAddressDetails(testData.user);

        // 13. Enter description in comment text area and click 'Place Order'
        await checkoutPage.enterComment('Test Order - Register while Checkout');
        await checkoutPage.clickPlaceOrder();

        // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await paymentPage.fillPaymentDetails('Test Name', '1234567890123456', '123', '12', '2025');

        // 15. Click 'Pay and Confirm Order' button
        await paymentPage.submitPayment();

        // 16. Verify success message 'Your order has been placed successfully!'
        await expect(paymentPage.orderPlacedSuccessMessage).toBeVisible();

        // 17. Click 'Delete Account' button
        await page.getByRole('link', { name: 'Delete Account' }).click();

        // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });

    // Test Case 15: Place Order: Register before Checkout
    test('Test Case 15: Place Order: Register before Checkout', async ({ homePage, productsPage, cartPage, authPage, checkoutPage, paymentPage, page }) => {
        const email = `test_checkout_before_${Date.now()}@example.com`;

        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 4. Fill all details in Signup and create account
        await authPage.registerUser(testData.user.name, email, testData.user);

        // 5. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();

        // 6. Verify 'Logged in as username' at top
        await expect(homePage.loggedInUser).toBeVisible();

        // 7. Add products to cart
        await homePage.clickProducts();
        await productsPage.addProductToCart(0);
        await productsPage.clickViewCart();

        // 8. Click 'Cart' button
        await expect(page).toHaveURL(/.*view_cart/);

        // 9. Verify that cart page is displayed
        const cartCount = await cartPage.getCartProductCount();
        expect(cartCount).toBeGreaterThan(0);

        // 10. Click Proceed To Checkout
        await cartPage.proceedToCheckoutButton.click();

        // 11. Verify Address Details and Review Your Order
        await checkoutPage.verifyAddressDetails(testData.user);

        // 12. Enter description in comment text area and click 'Place Order'
        await checkoutPage.enterComment('Test Order - Register before Checkout');
        await checkoutPage.clickPlaceOrder();

        // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await paymentPage.fillPaymentDetails('Test Name', '1234567890123456', '123', '12', '2025');

        // 14. Click 'Pay and Confirm Order' button
        await paymentPage.submitPayment();

        // 15. Verify success message 'Your order has been placed successfully!'
        await expect(paymentPage.orderPlacedSuccessMessage).toBeVisible();

        // 16. Click 'Delete Account' button
        await page.getByRole('link', { name: 'Delete Account' }).click();

        // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });

    // Test Case 16: Place Order: Login before Checkout
    test('Test Case 16: Place Order: Login before Checkout', async ({ homePage, productsPage, cartPage, authPage, checkoutPage, paymentPage, page }) => {
        const email = `test_checkout_login_${Date.now()}@example.com`;

        // Pre-condition: Register a user first
        await homePage.visit();
        await homePage.clickSignupLogin();
        await authPage.registerUser(testData.user.name, email, testData.user);
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();
        await homePage.clickLogout();

        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 4. Fill email, password and click 'Login' button
        await authPage.login(email, testData.user.password);

        // 5. Verify 'Logged in as username' at top
        await expect(homePage.loggedInUser).toBeVisible();

        // 6. Add products to cart
        await homePage.clickProducts();
        await productsPage.addProductToCart(0);
        await productsPage.clickViewCart();

        // 7. Click 'Cart' button
        await expect(page).toHaveURL(/.*view_cart/);

        // 8. Verify that cart page is displayed
        const cartCount = await cartPage.getCartProductCount();
        expect(cartCount).toBeGreaterThan(0);

        // 9. Click Proceed To Checkout
        await cartPage.proceedToCheckoutButton.click();

        // 10. Verify Address Details and Review Your Order
        await checkoutPage.verifyAddressDetails(testData.user);

        // 11. Enter description in comment text area and click 'Place Order'
        await checkoutPage.enterComment('Test Order - Login before Checkout');
        await checkoutPage.clickPlaceOrder();

        // 12. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await paymentPage.fillPaymentDetails('Test Name', '1234567890123456', '123', '12', '2025');

        // 13. Click 'Pay and Confirm Order' button
        await paymentPage.submitPayment();

        // 14. Verify success message 'Your order has been placed successfully!'
        await expect(paymentPage.orderPlacedSuccessMessage).toBeVisible();

        // 15. Click 'Delete Account' button
        await page.getByRole('link', { name: 'Delete Account' }).click();

        // 16. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });

    // Test Case 23: Verify address details in checkout page
    test('Test Case 23: Verify address details in checkout page', async ({ homePage, productsPage, cartPage, authPage, checkoutPage, page }) => {
        const email = `test_address_${Date.now()}@example.com`;

        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 4. Fill all details in Signup and create account
        await authPage.registerUser(testData.user.name, email, testData.user);

        // 5. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();

        // 6. Verify 'Logged in as username' at top
        await expect(homePage.loggedInUser).toBeVisible();

        // 7. Add products to cart
        await homePage.clickProducts();
        await productsPage.addProductToCart(0);
        await productsPage.clickViewCart();

        // 8. Click 'Cart' button
        await expect(page).toHaveURL(/.*view_cart/);

        // 9. Click 'Proceed To Checkout' button
        await cartPage.proceedToCheckoutButton.click();

        // 10. Verify that the delivery address is same address filled at the time registration of account
        await expect(checkoutPage.addressDetails).toContainText(testData.user.firstName);
        await expect(checkoutPage.addressDetails).toContainText(testData.user.lastName);
        await expect(checkoutPage.addressDetails).toContainText(testData.user.address);
        await expect(checkoutPage.addressDetails).toContainText(testData.user.city);
        await expect(checkoutPage.addressDetails).toContainText(testData.user.state);
        await expect(checkoutPage.addressDetails).toContainText(testData.user.zipCode);
        await expect(checkoutPage.addressDetails).toContainText(testData.user.country);
        await expect(checkoutPage.addressDetails).toContainText(testData.user.mobileNumber);

        // 11. Verify that the billing address is same address filled at the time registration of account
        const billingAddressDetails = page.locator('#address_invoice');
        await expect(billingAddressDetails).toContainText(testData.user.firstName);
        await expect(billingAddressDetails).toContainText(testData.user.lastName);
        await expect(billingAddressDetails).toContainText(testData.user.address);
        await expect(billingAddressDetails).toContainText(testData.user.city);
        await expect(billingAddressDetails).toContainText(testData.user.state);
        await expect(billingAddressDetails).toContainText(testData.user.zipCode);
        await expect(billingAddressDetails).toContainText(testData.user.country);
        await expect(billingAddressDetails).toContainText(testData.user.mobileNumber);

        // 12. Click 'Delete Account' button
        await homePage.clickDeleteAccount();

        // 13. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });

    // Test Case 24: Download Invoice after purchase order
    test('Test Case 24: Download Invoice after purchase order', async ({ homePage, productsPage, cartPage, authPage, checkoutPage, paymentPage, page }) => {
        const email = `test_invoice_${Date.now()}@example.com`;

        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Add products to cart
        await homePage.clickProducts();
        await productsPage.addProductToCart(0);
        await productsPage.clickViewCart();

        // 4. Verify that cart page is displayed
        await expect(page).toHaveURL(/.*view_cart/);

        // 5. Click Proceed To Checkout
        await cartPage.proceedToCheckoutButton.click();

        // 6. Click 'Register / Login' button
        await page.getByRole('link', { name: 'Register / Login' }).click();

        // 7. Fill all details in Signup and create account
        await authPage.registerUser(testData.user.name, email, testData.user);

        // 8. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();

        // 9. Verify 'Logged in as username' at top
        await expect(homePage.loggedInUser).toBeVisible();

        // 10. Click 'Cart' button
        await homePage.clickCart();

        // 11. Click 'Proceed To Checkout' button
        await cartPage.proceedToCheckoutButton.click();

        // 12. Verify Address Details and Review Your Order
        await checkoutPage.verifyAddressDetails(testData.user);

        // 13. Enter description in comment text area and click 'Place Order'
        await checkoutPage.enterComment('Test Order - Download Invoice');
        await checkoutPage.clickPlaceOrder();

        // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await paymentPage.fillPaymentDetails('Test Name', '1234567890123456', '123', '12', '2025');

        // 15. Click 'Pay and Confirm Order' button
        await paymentPage.submitPayment();

        // 16. Verify success message 'Your order has been placed successfully!'
        await expect(paymentPage.orderPlacedSuccessMessage).toBeVisible();

        // 17. Click 'Download Invoice' button and verify invoice is downloaded successfully
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('link', { name: 'Download Invoice' }).click();
        const download = await downloadPromise;
        
        // Verify download started
        expect(download.suggestedFilename()).toContain('invoice');
        
        // Save the file and verify it exists
        const downloadPath = path.join(__dirname, '../downloads', download.suggestedFilename());
        await download.saveAs(downloadPath);
        expect(fs.existsSync(downloadPath)).toBeTruthy();

        // 18. Click 'Continue' button
        await page.getByRole('link', { name: 'Continue' }).click();

        // 19. Click 'Delete Account' button
        await homePage.clickDeleteAccount();

        // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });
});
