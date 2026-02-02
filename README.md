# Playwright Automation Framework - Automation Exercise

This is a complete automation framework using Playwright with TypeScript for [https://automationexercise.com/](https://automationexercise.com/).

## Features
- **Page Object Model (POM)**: Modular and strictly typed page objects.
- **Fixture Support**: Custom fixtures for Pages.
- **Reporting**: Allure and HTML reporters.
- **CI/CD**: GitHub Actions workflow included.
- **Test Data**: Separated test data files.

## Project Structure
- `pages/`: Page Object Models classes.
- `tests/`: Spec files.
- `fixtures/`: Custom test fixtures.
- `data/`: Test data.
- `utils/`: Helper functions.

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

Run with UI mode:
```bash
npx playwright test --ui
```

## Reporting
Generate Allure report:
```bash
npx allure generate ./allure-results -o ./allure-report --clean
npx allure open ./allure-report
```
(Requires `allure-commandline` installed or use standard allure commands)

## Environment Variables
Review `.env` file for configuration.
`BASE_URL=https://automationexercise.com`
