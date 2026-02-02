import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;

    // Signup Form Details
    readonly titleMrRadio: Locator;
    readonly passwordInput: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly address1Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipCodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedHeader: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.loginEmailInput = page.locator('form[action="/login"] input[name="email"]');
        this.loginPasswordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');

        this.signupNameInput = page.locator('input[name="name"]');
        this.signupEmailInput = page.locator('form[action="/signup"] input[name="email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');

        this.titleMrRadio = page.locator('#id_gender1');
        this.passwordInput = page.locator('#password');
        this.daySelect = page.locator('#days');
        this.monthSelect = page.locator('#months');
        this.yearSelect = page.locator('#years');
        this.firstNameInput = page.locator('#first_name');
        this.lastNameInput = page.locator('#last_name');
        this.address1Input = page.locator('#address1');
        this.countrySelect = page.locator('#country');
        this.stateInput = page.locator('#state');
        this.cityInput = page.locator('#city');
        this.zipCodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.locator('#mobile_number');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');
        this.accountCreatedHeader = page.locator('h2[data-qa="account-created"]');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }

    async login(email: string, pass: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(pass);
        await this.clickAndWait(this.loginButton);
    }

    async initiateSignup(name: string, email: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.clickAndWait(this.signupButton);
    }

    async fillAccountDetails(details: any) {
        if (details.title === 'Mr') await this.titleMrRadio.check();
        await this.passwordInput.fill(details.password);
        await this.daySelect.selectOption(details.day);
        await this.monthSelect.selectOption(details.month);
        await this.yearSelect.selectOption(details.year);
        await this.firstNameInput.fill(details.firstName);
        await this.lastNameInput.fill(details.lastName);
        await this.address1Input.fill(details.address);
        await this.countrySelect.selectOption(details.country);
        await this.stateInput.fill(details.state);
        await this.cityInput.fill(details.city);
        await this.zipCodeInput.fill(details.zipCode);
        await this.mobileNumberInput.fill(details.mobileNumber);
        await this.clickAndWait(this.createAccountButton);
    }

    async registerUser(name: string, email: string, details: any) {
        await this.initiateSignup(name, email);
        await this.fillAccountDetails(details);
    }
}
