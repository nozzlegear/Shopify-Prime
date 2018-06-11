import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Product, Transaction } from '../models';

export class Products extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "products");
    }

    /**
     * Gets a count of all of the shop's Products.
     * @param options Options for filtering the results.
     * @see https://help.shopify.com/api/reference/product#count
     */
    public count(options?: Options.ProductBaseOptions & Options.DateOptions & Options.PublishedOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a list of up to 250 of the shop's Products.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.ProductListOptions & Options.PublishedOptions & Options.ListOptions & Options.FieldOptions) {
        return this.createRequest<Product[]>("GET", ".json", "products", options);
    }

    /**
     * Gets the Product with the given id.
     * @param id The Product's id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<Product>("GET", `${id}.json`, "product", options);
    }

    /**
     * Creates an Product.
     * @param product The Product being created.
     * @param options Options for creating the Product.
     */
    public create(product: Product) {
        return this.createRequest<Product>("POST", ".json", "product", { product });
    }

    /**
     * Updates an Product with the given id.
     * @param id The Product's id.
     * @param product The updated Product.
     */
    public update(id: number, product: Product) {
        return this.createRequest<Product>("PUT", `${id}.json`, "product", { product });
    }

    /**
     * Deletes an Product with the given id.
     * @param id The Product's id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}

export default Products;