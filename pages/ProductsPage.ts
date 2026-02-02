import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly allProducts: Locator;
    readonly allProductsHeader: Locator;
    readonly searchedProductsHeader: Locator;
    readonly productDetailName: Locator;
    readonly productDetailCategory: Locator;
    readonly productDetailPrice: Locator;
    readonly productDetailAvailability: Locator;
    readonly productDetailCondition: Locator;
    readonly productDetailBrand: Locator;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    readonly writeReviewHeader: Locator;
    readonly reviewNameInput: Locator;
    readonly reviewEmailInput: Locator;
    readonly reviewTextarea: Locator;
    readonly reviewSubmitButton: Locator;
    readonly reviewSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.allProducts = page.locator('.features_items');
        this.allProductsHeader = page.getByText('All Products');
        this.searchedProductsHeader = page.getByText('Searched Products');
        this.productDetailName = page.locator('.product-information h2');
        this.productDetailCategory = page.locator('.product-information p').first();
        this.productDetailPrice = page.locator('.product-information span span');
        this.productDetailAvailability = page.locator('.product-information p:has-text("Availability")');
        this.productDetailCondition = page.locator('.product-information p:has-text("Condition")');
        this.productDetailBrand = page.locator('.product-information p:has-text("Brand")');
        this.quantityInput = page.locator('#quantity');
        this.addToCartButton = page.locator('button:has-text("Add to cart")');
        this.writeReviewHeader = page.getByText('Write Your Review');
        this.reviewNameInput = page.locator('#name');
        this.reviewEmailInput = page.locator('#email');
        this.reviewTextarea = page.locator('#review');
        this.reviewSubmitButton = page.locator('#button-review');
        this.reviewSuccessMessage = page.locator('.alert-success span');
    }

    async searchProduct(name: string) {
        await this.searchInput.fill(name);
        await this.clickAndWait(this.searchButton);
    }

    async viewProduct(index: number) {
        const viewProductLinks = this.page.locator('.choose a[href*="product_details"]');
        await this.clickAndWait(viewProductLinks.nth(index));
    }

    async verifyProductDetailsVisible() {
        await expect(this.productDetailName).toBeVisible();
        await expect(this.productDetailCategory).toBeVisible();
        await expect(this.productDetailPrice).toBeVisible();
        await expect(this.productDetailAvailability).toBeVisible();
        await expect(this.productDetailCondition).toBeVisible();
        await expect(this.productDetailBrand).toBeVisible();
    }

    async setQuantity(quantity: number) {
        await this.quantityInput.clear();
        await this.quantityInput.fill(quantity.toString());
    }

    async clickAddToCart() {
        await this.clickAndWait(this.addToCartButton);
    }

    async addProductToCart(index: number) {
        const product = this.page.locator('.product-image-wrapper').nth(index);
        await product.hover();
        await this.clickAndWait(product.locator('.add-to-cart').first());
    }

    async addProductToCartByName(name: string) {
        const product = this.page.locator('.product-image-wrapper').filter({ hasText: name });
        await product.hover();
        await this.clickAndWait(product.locator('.add-to-cart').first());
    }

    async clickContinueShopping() {
        await this.clickAndWait(this.page.getByRole('button', { name: 'Continue Shopping' }));
    }

    async clickViewCart() {
        await this.clickAndWait(this.page.getByRole('link', { name: 'View Cart' }));
    }

    async clickBrand(brandName: string) {
        await this.clickAndWait(this.page.locator('.brands-name').getByRole('link', { name: brandName }));
    }

    async verifyBrandsVisible() {
        await expect(this.page.locator('.brands_products')).toBeVisible();
    }

    async submitReview(name: string, email: string, review: string) {
        await this.reviewNameInput.fill(name);
        await this.reviewEmailInput.fill(email);
        await this.reviewTextarea.fill(review);
        await this.clickAndWait(this.reviewSubmitButton);
    }

    async getProductCount() {
        return await this.page.locator('.product-image-wrapper').count();
    }
}

