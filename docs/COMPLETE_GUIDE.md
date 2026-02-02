# Complete Beginner's Guide to the Playwright Automation Framework

## Table of Contents
1. [Introduction - What is This Framework?](#1-introduction---what-is-this-framework)
2. [Understanding the Basics](#2-understanding-the-basics)
3. [Project Structure Explained](#3-project-structure-explained)
4. [Configuration Files Explained](#4-configuration-files-explained)
5. [Page Objects - The Building Blocks](#5-page-objects---the-building-blocks)
6. [Fixtures - Sharing Setup Between Tests](#6-fixtures---sharing-setup-between-tests)
7. [Test Data - Keeping Data Separate](#7-test-data---keeping-data-separate)
8. [Test Files - Where the Magic Happens](#8-test-files---where-the-magic-happens)
9. [Running Tests](#9-running-tests)
10. [Understanding Test Results](#10-understanding-test-results)
11. [Glossary of Terms](#11-glossary-of-terms)

---

## 1. Introduction - What is This Framework?

### What is Automation Testing?

Imagine you're a manual tester. Every day, you would:
1. Open a website
2. Click on buttons
3. Fill in forms
4. Check if things work correctly

Now imagine doing this 100 times a day, every day. That's exhausting and error-prone!

**Automation testing** is like having a robot do this work for you. You write instructions once, and the computer follows them automatically, thousands of times if needed, without getting tired or making mistakes.

### What is Playwright?

**Playwright** is a tool (created by Microsoft) that controls web browsers automatically. Think of it like a remote control for your browser. You can tell it:
- "Open this website"
- "Click this button"
- "Type 'hello' in this field"
- "Check if this text appears"

And it will do exactly that!

### What is TypeScript?

**TypeScript** is a programming language. It's like JavaScript (the language websites use) but with extra safety features. Think of it like this:
- JavaScript is like writing with a pen - quick but you can make spelling mistakes
- TypeScript is like writing with autocorrect - it catches mistakes before you finish

### What is This Framework For?

This framework is designed to test the website [https://automationexercise.com](https://automationexercise.com). It's a practice website for learning automation testing. Our framework can:
- Open the website
- Register new users
- Login/Logout
- Search for products
- Add items to cart
- Complete purchases
- And much more!

---

## 2. Understanding the Basics

### How Does Automation Testing Work?

1. **Locate Elements**: First, we need to tell the computer WHERE to click/type. Elements on a webpage have unique identifiers (like names, IDs, or classes).

2. **Perform Actions**: Then we tell it WHAT to do (click, type, scroll, etc.)

3. **Verify Results**: Finally, we check if the expected result happened (did the button take us to the right page? Did the message appear?)

### The Page Object Model (POM) Pattern

Imagine you're organizing your closet. Instead of throwing all clothes in one pile, you organize them:
- Shirts in one drawer
- Pants in another drawer
- Socks in a third drawer

The **Page Object Model** does the same thing for our code:
- All Home Page actions in one file
- All Login Page actions in another file
- All Cart Page actions in a third file

This makes our code:
- **Easier to read**: You know where to find things
- **Easier to maintain**: If a button changes, you only update one place
- **Reusable**: Use the same actions in multiple tests

---

## 3. Project Structure Explained

Let's look at all the folders and files in this project:

```
Automation Exercise/
├── pages/                    # 📁 All page object files go here
│   ├── AuthPage.ts          # Login and Signup page
│   ├── BasePage.ts          # Common actions shared by all pages
│   ├── CartPage.ts          # Shopping cart page
│   ├── CheckoutPage.ts      # Checkout page
│   ├── ContactPage.ts       # Contact Us page
│   ├── HomePage.ts          # Home page
│   ├── PaymentPage.ts       # Payment page
│   └── ProductsPage.ts      # Products page
│
├── tests/                    # 📁 All test files go here
│   ├── auth.spec.ts         # Tests for login, signup, logout
│   ├── brands.spec.ts       # Tests for brand products
│   ├── cart.spec.ts         # Tests for shopping cart
│   ├── categories.spec.ts   # Tests for product categories
│   ├── checkout.spec.ts     # Tests for checkout process
│   ├── contact.spec.ts      # Tests for contact form
│   ├── navigation.spec.ts   # Tests for page navigation
│   ├── products.spec.ts     # Tests for products
│   ├── scroll.spec.ts       # Tests for scroll functionality
│   └── subscription.spec.ts # Tests for email subscription
│
├── fixtures/                 # 📁 Test setup and shared resources
│   └── fixtures.ts          # Creates page objects for tests
│
├── data/                     # 📁 Test data files
│   └── testData.ts          # User information, etc.
│
├── downloads/                # 📁 Downloaded files during tests
│   └── .gitkeep             # Keeps folder in Git
│
├── .gitignore               # 📄 Tells Git what to ignore
├── package.json             # 📄 Project dependencies
├── playwright.config.ts     # 📄 Playwright settings
└── README.md                # 📄 Project documentation
```

### Why This Structure?

- **pages/**: Keeps all page-related code together. If the website changes, you update files here.
- **tests/**: Keeps all tests together. Each file focuses on one area (auth, cart, etc.)
- **fixtures/**: Keeps setup code separate from tests
- **data/**: Keeps test data separate, so you can change data without changing tests

---

## 4. Configuration Files Explained

### File: `playwright.config.ts`

This file tells Playwright HOW to run tests. Let me explain each part:

```typescript
// 📁 File: playwright.config.ts

// Import tools we need
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
```

**What does this mean?**
- `import` is like saying "I want to use this tool"
- `defineConfig` is Playwright's way to create settings
- `devices` contains pre-defined browser settings (like 'Desktop Chrome')
- `dotenv` reads settings from a `.env` file
- `path` helps with file paths

```typescript
// Read from default .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });
```

**What does this mean?**
- This line reads the `.env` file which contains settings like the website URL
- `__dirname` means "the folder where this file is"

```typescript
export default defineConfig({
  testDir: './tests',                    // Where are the test files?
```

**What does this mean?**
- `testDir: './tests'` tells Playwright "look for tests in the 'tests' folder"
- The `.` means "current folder"

```typescript
  fullyParallel: true,                   // Run tests at the same time?
```

**What does this mean?**
- When `true`, multiple tests can run simultaneously
- This makes testing faster!

```typescript
  forbidOnly: !!process.env.CI,          // Prevent test.only in CI
```

**What does this mean?**
- `test.only` is used to run just one test during development
- This setting prevents accidentally leaving `test.only` in your code when running on CI (like GitHub Actions)
- `!!` converts the value to true/false

```typescript
  retries: process.env.CI ? 2 : 0,       // Retry failed tests
```

**What does this mean?**
- If running on CI, retry failed tests 2 times
- If running locally, don't retry (0 times)
- This helps catch "flaky" tests (tests that sometimes fail randomly)

```typescript
  workers: process.env.CI ? 1 : undefined,  // How many parallel workers
```

**What does this mean?**
- On CI, use 1 worker (slower but more stable)
- Locally, use default (automatic, usually number of CPU cores)

```typescript
  reporter: [
    ['html'],                             // Creates a nice HTML report
    ['list'],                             // Shows progress in terminal
    ['allure-playwright']                 // Creates Allure reports
  ],
```

**What does this mean?**
- These are different ways to see test results
- `html` creates a webpage you can open to see results
- `list` shows results as tests run
- `allure-playwright` creates detailed interactive reports

```typescript
  use: {
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
```

**What does this mean?**
- `baseURL` is the website we're testing
- It first looks in `.env` file, if not found, uses the default URL

```typescript
    trace: 'on-first-retry',              // When to save trace
    screenshot: 'only-on-failure',        // When to take screenshots
    video: 'retain-on-failure',           // When to record video
  },
```

**What does this mean?**
- `trace`: Records detailed steps - only saves when test fails and retries
- `screenshot`: Takes a picture of the screen - only when test fails
- `video`: Records video - only keeps it when test fails

```typescript
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },  // Use Chrome settings
    },
  ],
});
```

**What does this mean?**
- We only run tests in Chrome (Chromium)
- `devices['Desktop Chrome']` has all the settings for Chrome browser

---

### File: `package.json`

This file lists all the tools (dependencies) our project needs.

```json
{
  "name": "automation-exercise",          // Project name
  "version": "1.0.0",                     // Project version
  "scripts": {                            // Shortcuts for commands
    "test": "playwright test"             // Instead of typing "npx playwright test"
  },
  "devDependencies": {                    // Tools needed for development
    "@playwright/test": "^1.40.0",        // Playwright testing library
    "allure-playwright": "^2.9.2",        // Allure reporting
    "dotenv": "^16.3.1"                   // Read .env files
  }
}
```

**What does this mean?**
- `scripts`: Shortcuts. Type `npm test` instead of `npx playwright test`
- `devDependencies`: Tools that get installed when you run `npm install`

---

### File: `.gitignore`

This file tells Git which files NOT to track/upload.

```
node_modules/           # Very large folder with dependencies
test-results/           # Test results (regenerated each run)
playwright-report/      # HTML reports
blob-report/            # Blob reports
playwright/.cache/      # Playwright browser cache
.env                    # Secret environment variables
allure-results/         # Allure results
allure-report/          # Allure reports
downloads/*             # Downloaded files during tests
!downloads/.gitkeep     # BUT keep the .gitkeep file
```

**Why ignore these?**
- `node_modules/` is huge (often 500MB+) and can be recreated with `npm install`
- Test results are different every time you run tests
- `.env` might contain secrets (passwords, API keys)
- Downloads are temporary files from tests

---

## 5. Page Objects - The Building Blocks

Page Objects are the heart of this framework. Each page of the website has its own file.

### File: `pages/BasePage.ts`

This is the **parent** of all other pages. It contains actions that ALL pages need.

```typescript
// 📁 File: pages/BasePage.ts

import { Page, Locator } from '@playwright/test';
```

**What does this mean?**
- `Page` is Playwright's representation of a browser tab
- `Locator` is a way to find elements on the page

```typescript
export class BasePage {
```

**What does this mean?**
- `export` lets other files use this code
- `class` is like a blueprint for creating objects
- Think of a class like a cookie cutter - it defines the shape, and you can make many cookies from it

```typescript
    readonly page: Page;
```

**What does this mean?**
- `readonly` means this value can't be changed after it's set
- `page` stores the browser tab we're working with
- `Page` is the type (like saying "this is definitely a Page, not a number")

```typescript
    constructor(page: Page) {
        this.page = page;
    }
```

**What does this mean?**
- `constructor` is a special function that runs when you create a new object
- It receives the browser page and stores it
- `this.page` refers to the class's page property

```typescript
    async navigateTo(path: string) {
        await this.page.goto(path);
    }
```

**What does this mean?**
- `async` means this function does something that takes time (like loading a webpage)
- `await` means "wait for this to finish before continuing"
- `goto` tells the browser to load a URL
- `path` is the URL to go to (like '/login')

```typescript
    async getTitle() {
        return await this.page.title();
    }
```

**What does this mean?**
- This gets the page title (what shows in the browser tab)
- `return` sends the value back to whoever called this function

```typescript
    async waitForUrl(url: string) {
        await this.page.waitForURL(url);
    }
}
```

**What does this mean?**
- This waits until the browser URL matches what we expect
- Useful after clicking a link to ensure the page loaded

---

### File: `pages/HomePage.ts`

This represents the home page of the website.

```typescript
// 📁 File: pages/HomePage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
```

**What does this mean?**
- We import `expect` for making assertions (checking if things are correct)
- We import `BasePage` so we can extend it (inherit its features)

```typescript
export class HomePage extends BasePage {
```

**What does this mean?**
- `extends BasePage` means HomePage INHERITS everything from BasePage
- HomePage can do everything BasePage can do, PLUS its own special features
- Think of it like: BasePage is a basic phone, HomePage is an iPhone that does everything a basic phone does plus more

```typescript
    readonly signupLoginButton: Locator;
    readonly productsButton: Locator;
    readonly cartButton: Locator;
    readonly loggedInUser: Locator;
```

**What does this mean?**
- These are like labels for finding specific elements on the page
- Each `Locator` will point to one specific button/link/text on the page

```typescript
    constructor(page: Page) {
        super(page);
```

**What does this mean?**
- `super(page)` calls the parent's (BasePage's) constructor
- This sets up the `this.page` property from BasePage

```typescript
        this.signupLoginButton = page.getByRole('link', { name: ' Signup / Login' });
```

**What does this mean?**
- `getByRole` finds elements by their role (like 'link', 'button', 'heading')
- This is looking for a link that contains the text "Signup / Login"
- Think of it like: "Find me the clickable link that says 'Signup / Login'"

```typescript
        this.productsButton = page.getByRole('link', { name: ' Products' });
        this.cartButton = page.getByRole('link', { name: 'Cart' });
        this.loggedInUser = page.locator('text=Logged in as');
```

**What does this mean?**
- `page.locator('text=Logged in as')` finds any element containing this text
- This is used to verify the user is logged in

```typescript
        this.subscriptionHeader = page.locator('.single-widget h2');
```

**What does this mean?**
- `.single-widget h2` is a CSS selector
- `.single-widget` means "element with class 'single-widget'"
- `h2` means "heading level 2"
- Combined: "Find the h2 heading inside an element with class 'single-widget'"

```typescript
        this.subscriptionEmailInput = page.locator('#susbscribe_email');
```

**What does this mean?**
- `#susbscribe_email` finds an element by its ID
- `#` means ID in CSS selectors
- Note: Yes, there's a typo in the website's code ('susbscribe' instead of 'subscribe')!

```typescript
        this.scrollUpArrow = page.locator('#scrollUp');
        this.heroText = page.getByText('Full-Fledged practice website for Automation Engineers');
```

**What does this mean?**
- `scrollUpArrow` finds the scroll-up button at the bottom right
- `heroText` finds the main headline text on the home page

Now let's look at the METHODS (actions):

```typescript
    async visit() {
        await this.navigateTo('/');
    }
```

**What does this mean?**
- `navigateTo('/')` goes to the home page
- `/` means the root/base URL (like going to automationexercise.com without anything after it)

```typescript
    async clickSignupLogin() {
        await this.signupLoginButton.click();
    }
```

**What does this mean?**
- `.click()` simulates clicking the button
- This is wrapped in a method so tests just call `clickSignupLogin()` instead of knowing about locators

```typescript
    async clickProducts() {
        await this.productsButton.click();
        await this.page.waitForURL(/.*products/);
    }
```

**What does this mean?**
- Click the Products button
- Wait until URL contains 'products'
- The `/.*/` is a "regular expression" (a pattern matcher)
- `.*products` means "anything followed by 'products'"

```typescript
    async clickLogout() {
        await this.page.getByRole('link', { name: 'Logout' }).click();
    }
```

**What does this mean?**
- Sometimes we create locators inline (not stored in a property)
- This is fine for things we only use once

```typescript
    async scrollToFooter() {
        await this.subscriptionHeader.scrollIntoViewIfNeeded();
    }
```

**What does this mean?**
- `scrollIntoViewIfNeeded()` scrolls the page until this element is visible
- Used when we need to see something at the bottom of the page

```typescript
    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
```

**What does this mean?**
- `page.evaluate()` runs JavaScript code directly in the browser
- `window.scrollTo(0, document.body.scrollHeight)` scrolls to the very bottom
- `0` is horizontal position (stay at left)
- `document.body.scrollHeight` is the full height of the page

```typescript
    async scrollToTop() {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }
```

**What does this mean?**
- Scrolls to the very top of the page
- Position (0, 0) is the top-left corner

```typescript
    async subscribe(email: string) {
        await this.subscriptionEmailInput.fill(email);
        await this.subscriptionSubmitButton.click();
    }
```

**What does this mean?**
- `fill()` types text into an input field (and clears any existing text first)
- This enters an email and clicks subscribe

```typescript
    async verifyCategoriesVisible() {
        await expect(this.categorySection).toBeVisible();
    }
```

**What does this mean?**
- `expect(...).toBeVisible()` is an ASSERTION
- It checks if the element is visible on screen
- If not visible, the test fails

```typescript
    async clickWomenCategory(subCategory: string) {
        await this.page.locator('a[href="#Women"]').click();
        await this.page.locator('#Women a').filter({ hasText: subCategory }).click();
    }
```

**What does this mean?**
- First, click on "Women" category to expand it
- `a[href="#Women"]` finds a link where href attribute equals "#Women"
- Then click on a sub-category (like "Dress" or "Tops")
- `.filter({ hasText: subCategory })` narrows down to elements containing specific text

```typescript
    async addRecommendedItemToCart() {
        const recommendedProduct = this.page.locator('#recommended-item-carousel .add-to-cart').first();
        await recommendedProduct.click();
    }
```

**What does this mean?**
- Find the "Add to Cart" button in the recommended items section
- `.first()` gets the first one if there are multiple
- Click it to add the product

```typescript
    async viewProductOnHomePage(index: number) {
        await this.page.locator('.features_items .choose a[href*="product_details"]').nth(index).click();
    }
}
```

**What does this mean?**
- `[href*="product_details"]` finds links whose href CONTAINS "product_details"
- `.nth(index)` gets the element at position `index` (0 = first, 1 = second, etc.)

---

### File: `pages/AuthPage.ts`

This handles login and signup functionality.

```typescript
// 📁 File: pages/AuthPage.ts

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
    // Login form elements
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    
    // Signup form elements
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
```

**What does this mean?**
- We define locators for both login AND signup forms
- Both forms exist on the same page (`/login`)

```typescript
    constructor(page: Page) {
        super(page);
        this.loginEmailInput = page.locator('form[action="/login"] input[name="email"]');
```

**What does this mean?**
- `form[action="/login"]` finds a form that submits to '/login'
- `input[name="email"]` finds an input field named "email"
- Combined: Find the email field specifically in the login form (not signup form)

```typescript
        this.loginPasswordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');
```

**What does this mean?**
- `data-qa` attributes are often added specifically for testing
- They're stable and don't change when styling changes

```typescript
        this.signupEmailInput = page.locator('form[action="/signup"] input[name="email"]');
```

**What does this mean?**
- Notice we specify `form[action="/signup"]` to get the signup form's email field
- There are TWO email fields on this page - one for login, one for signup

```typescript
        // Account creation form fields
        this.titleMrRadio = page.locator('#id_gender1');
        this.passwordInput = page.locator('#password');
        this.daySelect = page.locator('#days');
        this.monthSelect = page.locator('#months');
        this.yearSelect = page.locator('#years');
```

**What does this mean?**
- These are for the second page of signup (after entering name/email)
- `#id_gender1` is the radio button for "Mr."
- Select elements are dropdowns for date of birth

```typescript
        this.accountCreatedHeader = page.locator('h2[data-qa="account-created"]');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }
```

**What does this mean?**
- These appear on the "Account Created" confirmation page
- Used to verify account was created successfully

Now the METHOD implementations:

```typescript
    async login(email: string, pass: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(pass);
        await this.loginButton.click();
    }
```

**What does this mean?**
- A simple, reusable login function
- Takes email and password as parameters
- Any test can call `authPage.login('user@example.com', 'password123')`

```typescript
    async initiateSignup(name: string, email: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }
```

**What does this mean?**
- This starts the signup process (first step)
- After this, you'll be on the "Enter Account Information" page

```typescript
    async fillAccountDetails(details: any) {
        if (details.title === 'Mr') await this.titleMrRadio.check();
        await this.passwordInput.fill(details.password);
        await this.daySelect.selectOption(details.day);
        await this.monthSelect.selectOption(details.month);
        await this.yearSelect.selectOption(details.year);
```

**What does this mean?**
- `details: any` accepts an object with user information
- `.check()` clicks a radio button or checkbox
- `.selectOption()` selects an option in a dropdown

```typescript
        await this.firstNameInput.fill(details.firstName);
        await this.lastNameInput.fill(details.lastName);
        await this.address1Input.fill(details.address);
        await this.countrySelect.selectOption(details.country);
        await this.stateInput.fill(details.state);
        await this.cityInput.fill(details.city);
        await this.zipCodeInput.fill(details.zipCode);
        await this.mobileNumberInput.fill(details.mobileNumber);
        await this.createAccountButton.click();
    }
```

**What does this mean?**
- Fill in all the address/personal information
- Click "Create Account" at the end

```typescript
    async registerUser(name: string, email: string, details: any) {
        await this.initiateSignup(name, email);
        await this.fillAccountDetails(details);
    }
}
```

**What does this mean?**
- This is a CONVENIENCE METHOD that combines two steps
- Tests can call `authPage.registerUser(...)` instead of calling both methods separately

---

### File: `pages/ProductsPage.ts`

This handles the products listing and product details pages.

```typescript
// 📁 File: pages/ProductsPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly allProducts: Locator;
    readonly allProductsHeader: Locator;
    readonly searchedProductsHeader: Locator;
```

**What does this mean?**
- Locators for the search functionality
- `allProductsHeader` is the "ALL PRODUCTS" heading
- `searchedProductsHeader` is the "SEARCHED PRODUCTS" heading (appears after search)

```typescript
    // Product detail page elements
    readonly productDetailName: Locator;
    readonly productDetailCategory: Locator;
    readonly productDetailPrice: Locator;
    readonly productDetailAvailability: Locator;
    readonly productDetailCondition: Locator;
    readonly productDetailBrand: Locator;
```

**What does this mean?**
- These are for the individual product detail page
- Used to verify product information is displayed correctly

```typescript
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
```

**What does this mean?**
- On product detail page, you can change quantity before adding to cart

```typescript
    // Review section
    readonly writeReviewHeader: Locator;
    readonly reviewNameInput: Locator;
    readonly reviewEmailInput: Locator;
    readonly reviewTextarea: Locator;
    readonly reviewSubmitButton: Locator;
    readonly reviewSuccessMessage: Locator;
```

**What does this mean?**
- Product pages have a review section at the bottom
- These locators help us write and submit reviews

```typescript
    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.allProducts = page.locator('.features_items');
```

**What does this mean?**
- `.features_items` is the container for all product cards
- Used to verify products are displayed

```typescript
        this.productDetailName = page.locator('.product-information h2');
        this.productDetailCategory = page.locator('.product-information p').first();
        this.productDetailPrice = page.locator('.product-information span span');
```

**What does this mean?**
- Product info is inside `.product-information` element
- `h2` is the product name
- `.first()` gets the first `<p>` which contains category

```typescript
        this.productDetailAvailability = page.locator('.product-information p:has-text("Availability")');
        this.productDetailCondition = page.locator('.product-information p:has-text("Condition")');
        this.productDetailBrand = page.locator('.product-information p:has-text("Brand")');
```

**What does this mean?**
- `:has-text()` is a Playwright selector that finds elements containing specific text
- Finds the paragraph that says "Availability: In Stock" etc.

```typescript
        this.reviewSuccessMessage = page.locator('.alert-success span');
    }
```

**What does this mean?**
- After submitting a review, a success message appears in an alert box

Now the METHODS:

```typescript
    async searchProduct(name: string) {
        await this.searchInput.fill(name);
        await this.searchButton.click();
    }
```

**What does this mean?**
- Type product name in search box
- Click search button

```typescript
    async viewProduct(index: number) {
        const viewProductLinks = this.page.locator('.choose a[href*="product_details"]');
        await viewProductLinks.nth(index).click();
    }
```

**What does this mean?**
- `.choose` is the class for the "View Product" link container
- `nth(0)` = first product, `nth(1)` = second product, etc.

```typescript
    async verifyProductDetailsVisible() {
        await expect(this.productDetailName).toBeVisible();
        await expect(this.productDetailCategory).toBeVisible();
        await expect(this.productDetailPrice).toBeVisible();
        await expect(this.productDetailAvailability).toBeVisible();
        await expect(this.productDetailCondition).toBeVisible();
        await expect(this.productDetailBrand).toBeVisible();
    }
```

**What does this mean?**
- Check that ALL product details are visible
- If ANY is not visible, the test fails
- This verifies the product page loaded correctly

```typescript
    async setQuantity(quantity: number) {
        await this.quantityInput.clear();
        await this.quantityInput.fill(quantity.toString());
    }
```

**What does this mean?**
- `.clear()` removes existing text from input
- `.fill()` types the new quantity
- `quantity.toString()` converts number to text (fill() expects text)

```typescript
    async addProductToCart(index: number) {
        const product = this.page.locator('.product-image-wrapper').nth(index);
        await product.hover();
        await product.locator('.add-to-cart').first().click();
    }
```

**What does this mean?**
- Find the product card at position `index`
- `.hover()` moves mouse over it (this reveals the "Add to Cart" button)
- Click the "Add to Cart" button
- `.first()` because there might be multiple (one on image, one on overlay)

```typescript
    async clickContinueShopping() {
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    }
```

**What does this mean?**
- After adding to cart, a modal appears
- This clicks "Continue Shopping" to close it

```typescript
    async clickViewCart() {
        await this.page.getByRole('link', { name: 'View Cart' }).click();
    }
```

**What does this mean?**
- In the same modal, you can also click "View Cart"
- This navigates to the cart page

```typescript
    async clickBrand(brandName: string) {
        await this.page.locator('.brands-name').getByRole('link', { name: brandName }).click();
    }
```

**What does this mean?**
- On the products page, there's a "Brands" sidebar
- This clicks on a specific brand like "Polo" or "H&M"

```typescript
    async submitReview(name: string, email: string, review: string) {
        await this.reviewNameInput.fill(name);
        await this.reviewEmailInput.fill(email);
        await this.reviewTextarea.fill(review);
        await this.reviewSubmitButton.click();
    }
```

**What does this mean?**
- Fill in the review form and submit it
- Used in Test Case 21 to test the review functionality

```typescript
    async getProductCount() {
        return await this.page.locator('.product-image-wrapper').count();
    }
}
```

**What does this mean?**
- `.count()` returns the number of matching elements
- Used to verify search results return products

---

### File: `pages/CartPage.ts`

This handles the shopping cart page.

```typescript
// 📁 File: pages/CartPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartTable: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.cartTable = page.locator('#cart_info_table');
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
        this.emptyCartMessage = page.locator('#empty_cart');
    }
```

**What does this mean?**
- `#cart_info_table` is the table showing cart items
- `emptyCartMessage` appears when cart is empty

```typescript
    async verifyProductInCart(productName: string) {
        await expect(this.cartTable).toContainText(productName);
    }
```

**What does this mean?**
- Check that the cart table contains the product name somewhere
- `toContainText` does a partial match (doesn't need exact match)

```typescript
    async verifyProductQuantity(productName: string, expectedQuantity: string) {
        const productRow = this.page.locator('tr').filter({ hasText: productName });
        await expect(productRow.locator('.cart_quantity button')).toHaveText(expectedQuantity);
    }
```

**What does this mean?**
- Find the table row containing the product name
- `.filter({ hasText: productName })` narrows down to that specific row
- Then check the quantity column has the expected value

```typescript
    async removeProduct(productName: string) {
        const productRow = this.page.locator('tr').filter({ hasText: productName });
        await productRow.locator('.cart_quantity_delete').click();
    }
```

**What does this mean?**
- Find the row with the product
- Click the delete (X) button in that row
- This removes the product from cart

```typescript
    async verifyProductRemoved(productName: string) {
        await expect(this.page.locator('tr').filter({ hasText: productName })).not.toBeVisible();
    }
```

**What does this mean?**
- `.not.toBeVisible()` - this is a NEGATIVE assertion
- It passes if the element is NOT visible
- Used to verify product was actually removed

```typescript
    async getCartProductCount() {
        return await this.page.locator('#cart_info_table tbody tr').count();
    }
```

**What does this mean?**
- Count rows in the cart table body
- Each row is one product

```typescript
    async verifyCartIsEmpty() {
        await expect(this.emptyCartMessage).toBeVisible();
    }
}
```

**What does this mean?**
- When cart is empty, a message appears
- This verifies that message is shown

---

### File: `pages/ContactPage.ts`

This handles the Contact Us form.

```typescript
// 📁 File: pages/ContactPage.ts

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageTextarea: Locator;
    readonly uploadFileInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly getInTouchHeader: Locator;
    readonly homeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.locator('input[data-qa="name"]');
        this.emailInput = page.locator('input[data-qa="email"]');
        this.subjectInput = page.locator('input[data-qa="subject"]');
        this.messageTextarea = page.locator('textarea[data-qa="message"]');
        this.uploadFileInput = page.locator('input[name="upload_file"]');
```

**What does this mean?**
- Contact form has: name, email, subject, message, file upload
- `textarea` is for multi-line text (the message)
- `input[name="upload_file"]` is a file input for attachments

```typescript
        this.submitButton = page.locator('input[data-qa="submit-button"]');
        this.successMessage = page.locator('.status.alert.alert-success');
        this.getInTouchHeader = page.getByText('Get In Touch');
        this.homeButton = page.locator('.btn.btn-success');
    }
```

**What does this mean?**
- `.status.alert.alert-success` - element with ALL these classes
- `homeButton` is the green button that takes you back to home

```typescript
    async fillContactForm(name: string, email: string, subject: string, message: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextarea.fill(message);
    }
```

**What does this mean?**
- Fill all form fields except file upload
- Kept separate because file upload is optional

```typescript
    async uploadFile(filePath: string) {
        await this.uploadFileInput.setInputFiles(filePath);
    }
```

**What does this mean?**
- `.setInputFiles()` is Playwright's way to upload files
- You give it a file path on your computer
- The file gets "uploaded" to the form

```typescript
    async submitForm() {
        // Handle the dialog that appears
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
        await this.submitButton.click();
    }
```

**What does this mean?**
- When you submit, a JavaScript alert/confirm dialog appears
- `page.once('dialog', ...)` sets up a handler that runs ONCE when a dialog appears
- `dialog.accept()` clicks "OK" on the dialog
- Then we click the submit button

The order is important:
1. Set up the dialog handler (says "when dialog appears, click OK")
2. Click submit (this triggers the dialog)
3. Handler automatically accepts the dialog

```typescript
    async clickHome() {
        await this.homeButton.click();
    }
}
```

---

### File: `pages/CheckoutPage.ts`

This handles the checkout process.

```typescript
// 📁 File: pages/CheckoutPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    readonly addressDetails: Locator;
    readonly reviewOrder: Locator;
    readonly commentTextArea: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addressDetails = page.locator('#address_delivery');
        this.reviewOrder = page.locator('#cart_info');
        this.commentTextArea = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }
```

**What does this mean?**
- `#address_delivery` contains the delivery address
- `#cart_info` shows the order summary
- `placeOrderButton` proceeds to payment

```typescript
    async verifyAddressDetails(details: any) {
        await expect(this.addressDetails).toContainText(details.address);
        await expect(this.addressDetails).toContainText(details.city);
    }
```

**What does this mean?**
- Verify the address shown matches what was entered during registration
- Uses `toContainText` because address has extra formatting

```typescript
    async enterComment(comment: string) {
        await this.commentTextArea.fill(comment);
    }

    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }
}
```

---

### File: `pages/PaymentPage.ts`

This handles the payment form.

```typescript
// 📁 File: pages/PaymentPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expirationMonthInput: Locator;
    readonly expirationYearInput: Locator;
    readonly submitButton: Locator;
    readonly orderPlacedSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.nameOnCardInput = page.locator('input[name="name_on_card"]');
        this.cardNumberInput = page.locator('input[name="card_number"]');
        this.cvcInput = page.locator('input[name="cvc"]');
        this.expirationMonthInput = page.locator('input[name="expiry_month"]');
        this.expirationYearInput = page.locator('input[name="expiry_year"]');
        this.submitButton = page.locator('#submit');
        this.orderPlacedSuccessMessage = page.getByText('Order Placed!');
    }
```

**What does this mean?**
- Standard credit card form fields
- `orderPlacedSuccessMessage` appears after successful payment

```typescript
    async fillPaymentDetails(name: string, number: string, cvc: string, month: string, year: string) {
        await this.nameOnCardInput.fill(name);
        await this.cardNumberInput.fill(number);
        await this.cvcInput.fill(cvc);
        await this.expirationMonthInput.fill(month);
        await this.expirationYearInput.fill(year);
    }

    async submitPayment() {
        await this.submitButton.click();
    }
}
```

**What does this mean?**
- Fill all card details and submit
- Note: This is a test site, no real payment is processed!

---

## 6. Fixtures - Sharing Setup Between Tests

### File: `fixtures/fixtures.ts`

Fixtures are like "setup helpers" that prepare things before tests run.

```typescript
// 📁 File: fixtures/fixtures.ts

import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ContactPage } from '../pages/ContactPage';
```

**What does this mean?**
- `test as base` imports Playwright's test function, renamed to `base`
- We import all our page object classes

```typescript
type MyFixtures = {
    homePage: HomePage;
    authPage: AuthPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    paymentPage: PaymentPage;
    contactPage: ContactPage;
};
```

**What does this mean?**
- TypeScript "type" definition
- This says "our fixtures will have these properties with these types"
- It's like a contract or blueprint

```typescript
export const test = base.extend<MyFixtures>({
```

**What does this mean?**
- `base.extend` creates a NEW test function with extra features
- We're adding our fixtures to it

```typescript
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
```

**What does this mean?**
- This creates a `homePage` fixture
- `{ page }` - Playwright automatically provides a browser page
- `new HomePage(page)` - Create a HomePage instance with that page
- `await use(...)` - Make it available to tests

Think of it like a restaurant:
- `page` is the raw ingredient (browser tab)
- `HomePage(page)` is the prepared dish
- `use()` is serving it to the customer (test)

```typescript
    authPage: async ({ page }, use) => {
        await use(new AuthPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    paymentPage: async ({ page }, use) => {
        await use(new PaymentPage(page));
    },
    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page));
    },
});
```

**What does this mean?**
- Same pattern for all page objects
- Each test can request any of these fixtures

```typescript
export { expect } from '@playwright/test';
```

**What does this mean?**
- Re-export `expect` so tests can import from one place
- Instead of importing from multiple files

### How Tests Use Fixtures

Without fixtures:
```typescript
// Old way (repetitive)
test('my test', async ({ page }) => {
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);
    // Repeat in EVERY test!
});
```

With fixtures:
```typescript
// New way (clean!)
test('my test', async ({ homePage, authPage }) => {
    // Already created and ready to use!
});
```

---

## 7. Test Data - Keeping Data Separate

### File: `data/testData.ts`

This file contains all the data used in tests.

```typescript
// 📁 File: data/testData.ts

export const testData = {
    user: {
        name: 'TestUser',
        email: `test${Date.now()}@example.com`,  // Dynamic email
        password: 'password123',
        day: '10',
        month: 'April',
        year: '2000',
        firstName: 'Test',
        lastName: 'User',
        address: '123 Fake St',
        country: 'United States',
        state: 'Texas',
        city: 'Austin',
        zipCode: '78701',
        mobileNumber: '1234567890'
    }
};
```

**What does this mean?**
- `export` makes it available to other files
- `const` means this value can't be reassigned
- It's an object containing user data

**Why `Date.now()` in email?**
- `Date.now()` returns current time in milliseconds
- Example: `test1706900000000@example.com`
- This ensures every test uses a UNIQUE email
- Otherwise, the test would fail with "email already exists"

```typescript
export const existingUser = {
    email: 'valid_email@example.com',
    password: 'password123'
};
```

**What does this mean?**
- This would be used for pre-existing users
- In our tests, we create users dynamically instead

### Why Separate Data?

1. **Easy to Change**: Update data in ONE place, affects ALL tests
2. **Environment-Specific**: Can have different data for test vs production
3. **Readable Tests**: Tests focus on WHAT happens, not specific values
4. **Reusable**: Same user data used across multiple tests

---

## 8. Test Files - Where the Magic Happens

### File: `tests/auth.spec.ts` (Authentication Tests)

```typescript
// 📁 File: tests/auth.spec.ts

import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';
```

**What does this mean?**
- Import `test` from our fixtures (not from '@playwright/test')
- This gives us access to our page object fixtures
- Import test data

```typescript
test.describe('Authentication Tests', () => {
```

**What does this mean?**
- `test.describe` groups related tests together
- Like putting tests in a folder
- All tests inside are "Authentication Tests"

```typescript
    // Test Case 1: Register User
    test('Test Case 1: Register User', async ({ homePage, authPage, page }) => {
```

**What does this mean?**
- `test(...)` defines ONE test
- First argument is the test name (shown in reports)
- `async` because we'll use `await`
- `{ homePage, authPage, page }` - the fixtures we need

```typescript
        // 1. Launch browser and Navigate to url 'http://automationexercise.com'
        await homePage.visit();
```

**What does this mean?**
- Browser is launched automatically (by Playwright)
- `visit()` navigates to the website

```typescript
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveTitle(/Automation Exercise/);
```

**What does this mean?**
- `expect(page).toHaveTitle(...)` checks the page title
- `/Automation Exercise/` is a regular expression (pattern)
- It matches any title containing "Automation Exercise"
- `//` delimiters mean "this is a pattern" not exact text

```typescript
        // 3. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();
        await expect(page).toHaveURL(/.*login/);
```

**What does this mean?**
- Click the signup/login button
- Verify URL now contains "login"
- `.*` means "any characters" in regex

```typescript
        // 4. Verify 'New User Signup!' is visible
        await expect(page.getByText('New User Signup!')).toBeVisible();
```

**What does this mean?**
- Find text "New User Signup!" on the page
- Verify it's visible

```typescript
        // 5. Enter name and email address
        const email = `test_register_${Date.now()}@example.com`;
        await authPage.initiateSignup(testData.user.name, email);
```

**What does this mean?**
- Create a unique email for THIS test
- `testData.user.name` is "TestUser"
- Start the signup process

```typescript
        // 6. Click 'Signup' button (handled in initiateSignup)

        // 7. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await expect(page.getByText('Enter Account Information')).toBeVisible();
```

**What does this mean?**
- After clicking signup, we should see the account form
- Comments explain WHAT should happen (from the test case)

```typescript
        // 8-12. Fill details and create account
        await authPage.fillAccountDetails(testData.user);
```

**What does this mean?**
- One method call fills MANY fields
- This is the power of Page Object Model!

```typescript
        // 13. Verify that 'ACCOUNT CREATED!' is visible
        await expect(authPage.accountCreatedHeader).toBeVisible();
```

**What does this mean?**
- `accountCreatedHeader` is defined in AuthPage
- Should show success message

```typescript
        // 14. Click 'Continue' button
        await authPage.continueButton.click();
```

**What does this mean?**
- `continueButton` is a Locator defined in AuthPage
- We can call `.click()` directly on it

```typescript
        // 15. Verify that 'Logged in as username' is visible
        await expect(homePage.loggedInUser).toBeVisible();
        await expect(homePage.loggedInUser).toContainText(testData.user.name);
```

**What does this mean?**
- Two assertions on same element:
  1. It's visible
  2. It contains the username

```typescript
        // 16. Click 'Delete Account' button
        await homePage.clickDeleteAccount();

        // 17. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });
```

**What does this mean?**
- Clean up by deleting the test account
- Verify deletion was successful
- This prevents test data buildup

---

### Test Case 3: Login with Incorrect Password

```typescript
    // Test Case 3: Login User with incorrect email and password
    test('Test Case 3: Login User with incorrect email and password', async ({ homePage, authPage, page }) => {
        await homePage.visit();
        await expect(page).toHaveTitle(/Automation Exercise/);

        await homePage.clickSignupLogin();
        await expect(page.getByText('Login to your account')).toBeVisible();

        // Enter WRONG credentials
        await authPage.login('invalid_email@example.com', 'wrongpassword123');

        // Verify error message
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    });
```

**What does this mean?**
- This tests the NEGATIVE case (what happens when login fails)
- We expect an error message
- No cleanup needed - we didn't create an account

---

### Test Case 6: Contact Us Form

```typescript
// 📁 File: tests/contact.spec.ts

import { test, expect } from '../fixtures/fixtures';
import path from 'path';

test.describe('Contact Us Tests', () => {

    test('Test Case 6: Contact Us Form', async ({ homePage, contactPage, page }) => {
        await homePage.visit();
        await expect(page).toHaveTitle(/Automation Exercise/);

        // Click 'Contact Us'
        await homePage.clickContactUs();

        // Verify 'GET IN TOUCH' is visible
        await expect(contactPage.getInTouchHeader).toBeVisible();

        // Fill the form
        await contactPage.fillContactForm(
            'Test User',
            'testuser@example.com',
            'Test Subject',
            'This is a test message for contact form verification.'
        );
```

**What does this mean?**
- `path` is a Node.js module for file paths
- We fill out the contact form with test data

```typescript
        // Upload file
        const testFilePath = path.join(__dirname, '../data/testData.ts');
        await contactPage.uploadFile(testFilePath);
```

**What does this mean?**
- `__dirname` is the current file's directory
- `path.join(...)` creates a full path to the file
- We're uploading the testData.ts file as an attachment (any file works)

```typescript
        // Submit form (handles OK button in alert)
        await contactPage.submitForm();

        // Verify success
        await expect(contactPage.successMessage).toBeVisible();
        await expect(contactPage.successMessage).toContainText('Success! Your details have been submitted successfully.');

        // Go back home
        await contactPage.clickHome();
        await expect(page).toHaveTitle(/Automation Exercise/);
    });
});
```

---

### Test Case 12: Add Products to Cart

```typescript
// 📁 File: tests/cart.spec.ts

test('Test Case 12: Add Products in Cart', async ({ homePage, productsPage, cartPage, page }) => {
    await homePage.visit();
    await expect(page).toHaveTitle(/Automation Exercise/);

    // Go to Products page
    await homePage.clickProducts();

    // Add first product
    await productsPage.addProductToCart(0);  // index 0 = first product

    // Click Continue Shopping
    await productsPage.clickContinueShopping();

    // Add second product
    await productsPage.addProductToCart(1);  // index 1 = second product

    // View Cart
    await productsPage.clickViewCart();

    // Verify both products are in cart
    await expect(page).toHaveURL(/.*view_cart/);
    const cartProductCount = await cartPage.getCartProductCount();
    expect(cartProductCount).toBe(2);  // Should have exactly 2 products
```

**What does this mean?**
- Add two products to cart
- Verify count equals 2
- `expect(...).toBe(2)` is an exact equality check

```typescript
    // Verify details of each product
    const productRows = page.locator('#cart_info_table tbody tr');
    
    // First product
    const firstProductPrice = await productRows.nth(0).locator('.cart_price p').textContent();
    const firstProductQuantity = await productRows.nth(0).locator('.cart_quantity button').textContent();
    
    expect(firstProductPrice).toBeTruthy();  // Has some value
    expect(firstProductQuantity).toBe('1');  // Quantity is 1
```

**What does this mean?**
- Get references to product rows in the cart table
- Check price exists (not null/empty)
- Check quantity is "1"

---

### Test Case 24: Download Invoice

```typescript
// 📁 File: tests/checkout.spec.ts

import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';
import path from 'path';
import fs from 'fs';  // File system operations
```

**What does this mean?**
- `fs` (file system) lets us check if files exist

```typescript
test('Test Case 24: Download Invoice after purchase order', async ({ homePage, productsPage, cartPage, authPage, checkoutPage, paymentPage, page }) => {
    // ... (setup: add product, register, checkout, pay)

    // 17. Click 'Download Invoice' and verify
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download Invoice' }).click();
    const download = await downloadPromise;
```

**What does this mean?**
- `page.waitForEvent('download')` creates a promise that resolves when download starts
- We set it up BEFORE clicking (so we don't miss the event)
- Click the download button
- `await downloadPromise` waits for download to start

```typescript
    // Verify download started
    expect(download.suggestedFilename()).toContain('invoice');
```

**What does this mean?**
- `suggestedFilename()` returns the proposed filename
- Should contain "invoice"

```typescript
    // Save the file
    const downloadPath = path.join(__dirname, '../downloads', download.suggestedFilename());
    await download.saveAs(downloadPath);
    
    // Verify file exists
    expect(fs.existsSync(downloadPath)).toBeTruthy();
```

**What does this mean?**
- Save downloaded file to our 'downloads' folder
- `fs.existsSync(downloadPath)` returns true if file exists
- Verifies file was actually saved

---

### Test Case 25 & 26: Scroll Tests

```typescript
// 📁 File: tests/scroll.spec.ts

test('Test Case 25: Verify Scroll Up using Arrow button', async ({ homePage, page }) => {
    await homePage.visit();
    await expect(page).toHaveTitle(/Automation Exercise/);

    // Scroll to bottom
    await homePage.scrollToBottom();

    // Verify subscription section is visible
    await expect(homePage.subscriptionHeader).toBeVisible();

    // Click scroll-up arrow
    await homePage.clickScrollUpArrow();

    // Wait for animation
    await page.waitForTimeout(1000);

    // Verify we're at top
    await expect(homePage.heroText).toBeVisible();
});
```

**What does this mean?**
- Test scrolling DOWN to bottom
- Verify we see the footer (subscription section)
- Click the arrow button to scroll UP
- Verify the hero text (at top) is visible

```typescript
test('Test Case 26: Verify Scroll Up without Arrow button', async ({ homePage, page }) => {
    // ... same setup ...

    // Scroll up using JavaScript (no arrow button)
    await homePage.scrollToTop();

    await page.waitForTimeout(1000);
    await expect(homePage.heroText).toBeVisible();
});
```

**What does this mean?**
- Same test but WITHOUT using the arrow button
- Uses JavaScript `window.scrollTo(0, 0)` instead

---

## 9. Running Tests

### Basic Commands

**Run ALL tests:**
```bash
npx playwright test
```
This runs every `.spec.ts` file in the `tests/` folder.

**Run ONE specific file:**
```bash
npx playwright test tests/auth.spec.ts
```
Only runs authentication tests.

**Run tests matching a name:**
```bash
npx playwright test -g "Test Case 1"
```
`-g` means "grep" (search). Runs tests whose name contains "Test Case 1".

**Run in headed mode (see the browser):**
```bash
npx playwright test --headed
```
Normally tests run "headless" (invisible). This shows the browser.

**Run in UI mode (interactive):**
```bash
npx playwright test --ui
```
Opens a visual interface where you can run/rerun tests, see results, view traces.

**Run in debug mode:**
```bash
npx playwright test --debug
```
Pauses at each step so you can see what's happening.

**Run specific project:**
```bash
npx playwright test --project=chromium
```
We only have chromium configured, but useful if you add firefox/webkit.

### Understanding the Output

When tests run, you'll see:
```
Running 26 tests using 4 workers

  ✓ auth.spec.ts:9:5 › Authentication Tests › Test Case 1: Register User (15s)
  ✓ auth.spec.ts:52:5 › Authentication Tests › Test Case 2: Login User... (12s)
  ✗ cart.spec.ts:25:5 › Cart Tests › Test Case 12: Add Products in Cart (8s)
```

- ✓ = Test PASSED (green)
- ✗ = Test FAILED (red)
- (15s) = How long it took
- "4 workers" = 4 tests running in parallel

---

## 10. Understanding Test Results

### HTML Report

After running tests:
```bash
npx playwright show-report
```

This opens a webpage showing:
- Summary (passed/failed/skipped)
- Each test with details
- Screenshots (if test failed)
- Traces (detailed step-by-step recording)

### Allure Report

Generate Allure report:
```bash
npx allure generate ./allure-results -o ./allure-report --clean
npx allure open ./allure-report
```

Allure provides:
- Beautiful dashboards
- Trend charts
- Test history
- Categories (by error type)

### What to Do When Tests Fail

1. **Look at the error message**: Usually tells you what went wrong
2. **Check the screenshot**: See what the page looked like
3. **View the trace**: Step-by-step recording of what happened
4. **Run in headed mode**: Watch the test run to see the issue
5. **Check if the website changed**: Selectors might need updating

---

## 11. Glossary of Terms

| Term | Simple Explanation |
|------|-------------------|
| **Async/Await** | Tells JavaScript to wait for slow operations (like page loads) |
| **Assertion** | A check that verifies something is correct (expect...) |
| **CSS Selector** | A pattern to find elements (like `#id` or `.class`) |
| **Fixture** | Reusable setup that runs before tests |
| **Headed** | Browser is visible when running |
| **Headless** | Browser runs invisibly (faster) |
| **Locator** | A way to find an element on the page |
| **Page Object** | A class that represents one page of your website |
| **Promise** | A value that will be available in the future |
| **Regex** | Pattern matching for text (like `/.*products/`) |
| **Selector** | How to find an element (ID, class, text, etc.) |
| **Test Case** | One specific thing you're testing |
| **Test Suite** | A group of related test cases |
| **Worker** | A parallel process running tests |

---

## Quick Reference Card

### Common Locator Methods
```typescript
page.locator('#id')                    // By ID
page.locator('.class')                 // By class
page.locator('button')                 // By tag
page.locator('[name="email"]')         // By attribute
page.getByText('Hello')                // By visible text
page.getByRole('button', {name: 'Submit'})  // By role
page.getByLabel('Email')               // By label
page.getByPlaceholder('Enter email')   // By placeholder
```

### Common Actions
```typescript
await element.click()           // Click
await element.fill('text')      // Type text
await element.clear()           // Clear input
await element.hover()           // Mouse over
await element.check()           // Check checkbox/radio
await element.selectOption('value')  // Select dropdown
await element.setInputFiles('path')  // Upload file
```

### Common Assertions
```typescript
await expect(element).toBeVisible()
await expect(element).toHaveText('exact text')
await expect(element).toContainText('partial')
await expect(page).toHaveURL(/pattern/)
await expect(page).toHaveTitle('Title')
await expect(value).toBe(expected)
await expect(value).toBeTruthy()
```

---

**Congratulations!** You now understand this entire automation framework from the ground up. Start by running the tests, then try modifying them, and finally create your own!
