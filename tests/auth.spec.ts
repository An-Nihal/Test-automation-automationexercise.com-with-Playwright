import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Authentication Tests', () => {

    // Test Case 1: Register User
    test('Test Case 1: Register User', async ({ homePage, authPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();
        await expect(page).toHaveURL(/.*login/);

        // 4. Verify 'New User Signup!' is visible
        await expect(page.getByText('New User Signup!')).toBeVisible();

        // 5. Enter name and email address
        const email = `test_register_${Date.now()}@example.com`;
        await authPage.initiateSignup(testData.user.name, email);

        // 6. Click 'Signup' button (handled in initiateSignup)

        // 7. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await expect(page.getByText('Enter Account Information')).toBeVisible();

        // 8. Fill details: Title, Name, Email, Password, Date of birth
        // 9. Select checkbox 'Sign up for our newsletter!'
        // 10. Select checkbox 'Receive special offers from our partners!'
        // 11. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        // 12. Click 'Create Account button'
        await authPage.fillAccountDetails(testData.user);

        // 13. Verify that 'ACCOUNT CREATED!' is visible
        await expect(authPage.accountCreatedHeader).toBeVisible();

        // 14. Click 'Continue' button
        await authPage.continueButton.click();

        // 15. Verify that 'Logged in as username' is visible
        await expect(homePage.loggedInUser).toBeVisible();
        await expect(homePage.loggedInUser).toContainText(testData.user.name);

        // 16. Click 'Delete Account' button
        await homePage.clickDeleteAccount();

        // 17. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });

    // Test Case 2: Login User with correct email and password
    test('Test Case 2: Login User with correct email and password', async ({ homePage, authPage, page }) => {
        const email = `test_login_${Date.now()}@example.com`;

        // First, register a user to login with
        await homePage.visit();
        await homePage.clickSignupLogin();
        await authPage.registerUser(testData.user.name, email, testData.user);
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();
        await homePage.clickLogout();

        // Now test the login flow
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 4. Verify 'Login to your account' is visible
        await expect(page.getByText('Login to your account')).toBeVisible();

        // 5. Enter correct email address and password
        // 6. Click 'login' button
        await authPage.login(email, testData.user.password);

        // 7. Verify that 'Logged in as username' is visible
        await expect(homePage.loggedInUser).toBeVisible();
        await expect(homePage.loggedInUser).toContainText(testData.user.name);

        // 8. Click 'Delete Account' button
        await homePage.clickDeleteAccount();
        // 9. Verify that 'ACCOUNT DELETED!' is visible
        await expect(page.getByText('Account Deleted!')).toBeVisible();
    });

    // Test Case 3: Login User with incorrect email and password
    test('Test Case 3: Login User with incorrect email and password', async ({ homePage, authPage, page }) => {
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 4. Verify 'Login to your account' is visible
        await expect(page.getByText('Login to your account')).toBeVisible();

        // 5. Enter incorrect email address and password
        // 6. Click 'login' button
        await authPage.login('invalid_email@example.com', 'wrongpassword123');

        // 7. Verify error 'Your email or password is incorrect!' is visible
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    });

    // Test Case 4: Logout User
    test('Test Case 4: Logout User', async ({ homePage, authPage, page }) => {
        const email = `test_logout_${Date.now()}@example.com`;

        // First, register a user to login with
        await homePage.visit();
        await homePage.clickSignupLogin();
        await authPage.registerUser(testData.user.name, email, testData.user);
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();
        await homePage.clickLogout();

        // Now test the logout flow
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 4. Verify 'Login to your account' is visible
        await expect(page.getByText('Login to your account')).toBeVisible();

        // 5. Enter correct email address and password
        // 6. Click 'login' button
        await authPage.login(email, testData.user.password);

        // 7. Verify that 'Logged in as username' is visible
        await expect(homePage.loggedInUser).toBeVisible();
        await expect(homePage.loggedInUser).toContainText(testData.user.name);

        // 8. Click 'Logout' button
        await homePage.clickLogout();

        // 9. Verify that user is navigated to login page
        await expect(page).toHaveURL(/.*login/);
        await expect(page.getByText('Login to your account')).toBeVisible();
    });

    // Test Case 5: Register User with existing email
    test('Test Case 5: Register User with existing email', async ({ homePage, authPage, page }) => {
        const email = `test_existing_${Date.now()}@example.com`;

        // First, register a user
        await homePage.visit();
        await homePage.clickSignupLogin();
        await authPage.registerUser(testData.user.name, email, testData.user);
        await expect(authPage.accountCreatedHeader).toBeVisible();
        await authPage.continueButton.click();
        await homePage.clickLogout();

        // Now try to register with the same email
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);

        // 3. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 4. Verify 'New User Signup!' is visible
        await expect(page.getByText('New User Signup!')).toBeVisible();

        // 5. Enter name and already registered email address
        await authPage.signupNameInput.fill(testData.user.name);
        await authPage.signupEmailInput.fill(email);
        
        // 6. Click 'Signup' button
        await authPage.signupButton.click();

        // 7. Verify error 'Email Address already exist!' is visible
        await expect(page.getByText('Email Address already exist!')).toBeVisible();
    });
});
