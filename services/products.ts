import { Product } from "../typings/models/product";
import BaseService from "../infrastructure/base_service";

// Enums
import { FieldOptions } from "../typings/options/base";
import { ProductCountOptions, ProductListOptions } from "../typings/options/products";

export default class Products extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "products");
    }

    /**
     * Gets a count of all of the shop's Products.
     * @param options Options for filtering the results.
     * @see https://help.shopify.com/api/reference/product#count
     */
    public count(options?: ProductCountOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a list of up to 250 of the shop's Products.
     * @param options Options for filtering the results.
     */
    public list(options?: ProductListOptions) {
        return this.createRequest<Product[]>("GET", ".json", "products", options);
    }

    // /**
    //  * Gets a list of up to 250 Products from the given customer.
    //  * @param customerId The customer's id.
    //  * @param options Options for filtering the results.
    //  */
    // public listForCustomer(customerId: number, options?: ProductListOptions) {
    //     return this.createRequest<Product[]>("GET", ".json", "products", Object.assign({ customer_id: customerId }, options));
    // }

    // /**
    //  * Gets the Product with the given id.
    //  * @param ProductId The Product's id.
    //  * @param options Options for filtering the results.
    //  */
    // public get(ProductId: number, options?: FieldOptions) {
    //     return this.createRequest<Product>("GET", `${ProductId}.json`, "Product", options);
    // }

    // /**
    //  * Creates an Product.
    //  * @param Product The Product being created.
    //  * @param options Options for creating the Product.
    //  */
    // public create(Product: Product, transactions?: Transaction[], options?: ProductCreateOptions) {
    //     return this.createRequest<Product>("POST", ".json", "Product", { Product: Object.assign({}, Product, options, { transactions }) });
    // }

    // /**
    //  * Updates an Product with the given id.
    //  * @param id The Product's id.
    //  * @param Product The updated Product.
    //  */
    // public update(id: number, Product: Product) {
    //     return this.createRequest<Product>("PUT", `${id}.json`, "Product", { Product });
    // }

    // /**
    //  * Deletes an Product with the given id.
    //  * @param id The Product's id.
    //  */
    // public delete(id: number) {
    //     return this.createRequest<void>("DELETE", `${id}.json`);
    // }

    // /**
    //  * Closes an Product with the given id.
    //  * @param id The Product's id.
    //  */
    // public close(id: number) {
    //     return this.createRequest<Product>("POST", `${id}/close.json`, "Product");
    // }

    // /**
    //  * Opens an Product with the given id.
    //  * @param id The Product's id.
    //  */
    // public open(id: number) {
    //     return this.createRequest<Product>("POST", `${id}/open.json`, "Product");
    // }

    // /**
    //  * Cancels an Product with the given id.
    //  * @param id The Product's id.
    //  * @param options Options for canceling the Product.
    //  */
    // public cancel(id: number, options?: ProductCancelOptions) {
    //     return this.createRequest<Product>("POST", `${id}/cancel.json`, 'Product');
    // }
}