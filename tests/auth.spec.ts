import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Authentication Tests', () => {

    test('Register User Flow', async ({ homePage, authPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 2. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();
        await expect(page).toHaveURL(/.*login/);

        // 3. Verify 'New User Signup!' is visible
        await expect(page.getByText('New User Signup!')).toBeVisible();

        // 4. Enter name and email address
        await authPage.initiateSignup(testData.user.name, testData.user.email);

        // 5. Click 'Signup' button (handled in initiateSignup)

        // 6. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await expect(page.getByText('Enter Account Information')).toBeVisible();

        // 7. Fill details: Title, Name, Email, Password, Date of birth
        // 8. Select checkbox 'Sign up for our newsletter!' (Skipping for now)
        // 9. Select checkbox 'Receive special offers from our partners!' (Skipping for now)
        // 10. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        // 11. Click 'Create Account button'
        await authPage.fillAccountDetails(testData.user);

        // 12. Verify that 'ACCOUNT CREATED!' is visible
        await expect(authPage.accountCreatedHeader).toBeVisible();

        // 13. Click 'Continue' button
        await authPage.continueButton.click();

        // 14. Verify that 'Logged in as username' is visible
        await expect(homePage.loggedInUser).toBeVisible();
        await expect(homePage.loggedInUser).toContainText(testData.user.name);

        // 15. Click 'Delete Account' button
        await homePage.clickDeleteAccount();

        // 16. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });

    test('Login User Flow', async ({ homePage, authPage, page }) => {
        const email = `test_login_${Date.now()}@example.com`;

        // Register a user to login with
        await homePage.visit();
        await homePage.clickSignupLogin();
        await authPage.registerUser(testData.user.name, email, testData.user);
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();
        await homePage.clickLogout();

        // Login Flow
        await expect(page).toHaveURL(/.*login/);
        await authPage.login(email, testData.user.password);

        // Verify logged in
        await expect(homePage.loggedInUser).toBeVisible();
        await expect(homePage.loggedInUser).toContainText(testData.user.name);

        // Delete Account
        await homePage.clickDeleteAccount();
        await expect(page.getByText('Account Deleted!')).toBeVisible();
    });
});
