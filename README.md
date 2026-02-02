# Playwright Automation Framework - Automation Exercise

This is a complete automation framework using Playwright with TypeScript for [https://automationexercise.com/](https://automationexercise.com/).

> 📚 **New to automation testing?** Check out our [Complete Beginner's Guide](docs/COMPLETE_GUIDE.md) - a detailed documentation explaining every file, every line of code, assuming zero prior knowledge of Playwright, TypeScript, or automation testing.

## Features
- **Page Object Model (POM)**: Modular and strictly typed page objects.
- **Fixture Support**: Custom fixtures for all page objects.
- **Complete Test Coverage**: All 26 test cases from the [Test Cases Page](https://automationexercise.com/test_cases).
- **Reporting**: Allure and HTML reporters.
- **CI/CD**: GitHub Actions workflow included.
- **Test Data**: Separated test data files.

## Project Structure
```
├── pages/                    # Page Object Models
│   ├── AuthPage.ts          # Login/Signup page actions
│   ├── BasePage.ts          # Base page with common methods
│   ├── CartPage.ts          # Shopping cart page actions
│   ├── CheckoutPage.ts      # Checkout page actions
│   ├── ContactPage.ts       # Contact Us page actions
│   ├── HomePage.ts          # Home page actions
│   ├── PaymentPage.ts       # Payment page actions
│   └── ProductsPage.ts      # Products page actions
├── tests/                    # Test specifications
│   ├── auth.spec.ts         # Authentication tests (TC 1-5)
│   ├── brands.spec.ts       # Brand products tests (TC 19)
│   ├── cart.spec.ts         # Cart tests (TC 12, 13, 17, 22)
│   ├── categories.spec.ts   # Category products tests (TC 18)
│   ├── checkout.spec.ts     # Checkout tests (TC 14-16, 23-24)
│   ├── contact.spec.ts      # Contact form tests (TC 6)
│   ├── navigation.spec.ts   # Navigation tests (TC 7)
│   ├── products.spec.ts     # Products tests (TC 8, 9, 20, 21)
│   ├── scroll.spec.ts       # Scroll functionality tests (TC 25-26)
│   └── subscription.spec.ts # Subscription tests (TC 10-11)
├── fixtures/                 # Custom test fixtures
│   └── fixtures.ts          # Page object fixtures
├── data/                     # Test data
│   └── testData.ts          # User and test data
├── downloads/                # Downloaded files (invoices)
└── utils/                    # Helper functions
```

## Test Cases Implemented

All 26 test cases from [automationexercise.com/test_cases](https://automationexercise.com/test_cases) are implemented:

| Test Case | Description | Test File |
|-----------|-------------|-----------|
| TC 1 | Register User | auth.spec.ts |
| TC 2 | Login User with correct email and password | auth.spec.ts |
| TC 3 | Login User with incorrect email and password | auth.spec.ts |
| TC 4 | Logout User | auth.spec.ts |
| TC 5 | Register User with existing email | auth.spec.ts |
| TC 6 | Contact Us Form | contact.spec.ts |
| TC 7 | Verify Test Cases Page | navigation.spec.ts |
| TC 8 | Verify All Products and product detail page | products.spec.ts |
| TC 9 | Search Product | products.spec.ts |
| TC 10 | Verify Subscription in home page | subscription.spec.ts |
| TC 11 | Verify Subscription in Cart page | subscription.spec.ts |
| TC 12 | Add Products in Cart | cart.spec.ts |
| TC 13 | Verify Product quantity in Cart | cart.spec.ts |
| TC 14 | Place Order: Register while Checkout | checkout.spec.ts |
| TC 15 | Place Order: Register before Checkout | checkout.spec.ts |
| TC 16 | Place Order: Login before Checkout | checkout.spec.ts |
| TC 17 | Remove Products From Cart | cart.spec.ts |
| TC 18 | View Category Products | categories.spec.ts |
| TC 19 | View & Cart Brand Products | brands.spec.ts |
| TC 20 | Search Products and Verify Cart After Login | products.spec.ts |
| TC 21 | Add review on product | products.spec.ts |
| TC 22 | Add to cart from Recommended items | cart.spec.ts |
| TC 23 | Verify address details in checkout page | checkout.spec.ts |
| TC 24 | Download Invoice after purchase order | checkout.spec.ts |
| TC 25 | Verify Scroll Up using 'Arrow' button and Scroll Down | scroll.spec.ts |
| TC 26 | Verify Scroll Up without 'Arrow' button and Scroll Down | scroll.spec.ts |

## Prerequisites
- Node.js (v14+)
- NPM

## Installation
```bash
npm install
npx playwright install
```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test file:
```bash
npx playwright test tests/auth.spec.ts
```

Run specific test by name:
```bash
npx playwright test -g "Test Case 1"
```

Run tests by category:
```bash
# Authentication tests
npx playwright test tests/auth.spec.ts

# Cart tests
npx playwright test tests/cart.spec.ts

# Checkout tests
npx playwright test tests/checkout.spec.ts

# Product tests
npx playwright test tests/products.spec.ts
```

Run with UI mode:
```bash
npx playwright test --ui
```

Run in headed mode:
```bash
npx playwright test --headed
```

Run with debug mode:
```bash
npx playwright test --debug
```

## Reporting

### HTML Report
```bash
npx playwright show-report
```

### Allure Report
Generate and open Allure report:
```bash
npx allure generate ./allure-results -o ./allure-report --clean
npx allure open ./allure-report
```
(Requires `allure-commandline` installed or use standard allure commands)

## Configuration

### Playwright Config
The `playwright.config.ts` file contains:
- Base URL configuration
- Browser settings (Chromium by default)
- Reporter configuration (HTML, List, Allure)
- Screenshot and video on failure

### Environment Variables
Create a `.env` file with:
```
BASE_URL=https://automationexercise.com
```

## Page Objects

| Page Object | Description |
|-------------|-------------|
| `AuthPage` | Handles login, signup, and account creation |
| `BasePage` | Base class with common navigation methods |
| `CartPage` | Shopping cart actions and verifications |
| `CheckoutPage` | Checkout process and address verification |
| `ContactPage` | Contact form submission |
| `HomePage` | Home page navigation, categories, subscription |
| `PaymentPage` | Payment details and order confirmation |
| `ProductsPage` | Product search, view, review, and cart actions |

## Contributing
1. Create a feature branch
2. Make your changes
3. Run tests to ensure they pass
4. Submit a pull request

## License
MIT
