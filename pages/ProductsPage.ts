import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly allProducts: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.allProducts = page.locator('.features_items');
    }

    async searchProduct(name: string) {
        await this.searchInput.fill(name);
        await this.searchButton.click();
    }

    async addProductToCart(index: number) {
        // Hover over the product and click 'Add to cart'
        // Index is 0-based
        const product = this.page.locator('.product-image-wrapper').nth(index);
        await product.hover();
        await product.locator('.add-to-cart').first().click(); // There are two add-to-cart buttons per product (one in overlay), usually the overlay one is interacting
        // Or specific selector: 
        // .overlay-content > .btn.add-to-cart
    }

    async addProductToCartByName(name: string) {
        // Implementation might depend on finding the product with text
        // For now, let's stick to index or simple "first"
        const product = this.page.locator('.product-image-wrapper').filter({ hasText: name });
        await product.hover();
        await product.locator('.add-to-cart').first().click();
    }
}
