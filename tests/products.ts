import * as Prime from '../';
import inspect from 'logspect/bin';
import {
    AsyncSetupFixture,
    AsyncTeardownFixture,
    AsyncTest,
    IgnoreTest,
    TestFixture,
    Timeout
    } from 'alsatian';
import { Config, createGuid, Expect } from './test_utils';

@TestFixture("Product Tests")
export class ProductTests {
    private service = new Prime.Products(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.Product[] = [];

    @AsyncTeardownFixture
    private async teardownAsync() {
        await Promise.all(this.created.map(created => this.service.delete(created.id)));

        inspect(`Deleted ${this.created.length} objects during teardown.`);

        // Wait 3 seconds after all tests to let the API rate limit bucket empty.
        inspect("Waiting 3 seconds to let API rate limit empty.")
        
        await new Promise(resolve => setTimeout(() => {
            inspect("Continuing.")
            resolve();
        }, 3000));
    }

    private async create(scheduleForDeletion = true) {
        const obj = await this.service.create({
            title: "Shopify Prime Test Product",
            vendor: "Auntie Dot",
            body_html: "<strong>This product was created while testing ShopifySharp!</strong>",
            product_type: "Foobars",
            handle: createGuid(),
            images: [
                {
                    attachment: "R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                }
            ],
        });

        if (scheduleForDeletion) {
            this.created.push(obj);
        };

        return obj;
    }

    @AsyncTest("should delete a product")
    @Timeout(5000)
    public async Test1() {
        const product = await this.create(false);
        let error;

        try {
            await this.service.delete(product.id);
        } catch (e) {
            inspect(`Error deleting product`, e);

            error = e;

            this.created.push(product);
        }

        Expect(error).toBeNullOrUndefined();
    }

    @AsyncTest("should create a product")
    @Timeout(5000)
    public async Test2() {
        const product = await this.create();

        Expect(product.id).toBeType("number");
        Expect(product.id).toBeGreaterThanOrEqualTo(1);
        Expect(product.title).toEqual("Shopify Prime Test Product");
        Expect(product.vendor).toEqual("Auntie Dot");
        Expect(product.body_html).toEqual("<strong>This product was created while testing ShopifySharp!</strong>");
        Expect(product.product_type).toEqual("Foobars");
        Expect(product.handle).toBeType("string");
        Expect(product.images).toBeAnArray();
        Expect(product.images).itemsToPassValidator<Prime.Models.ProductImage>(i => Expect(i.src).toBeType("string"));
    }

    @AsyncTest("should get a product")
    @Timeout(5000)
    public async Test3() {
        const created = await this.create();
        const product = await this.service.get(created.id);

        Expect(product.id).toEqual(created.id);
        Expect(product.title).toEqual("Shopify Prime Test Product");
        Expect(product.vendor).toEqual("Auntie Dot");
        Expect(product.body_html).toEqual("<strong>This product was created while testing ShopifySharp!</strong>");
        Expect(product.product_type).toEqual("Foobars");
        Expect(product.handle).toBeType("string");
        Expect(product.images).toBeAnArray();
        Expect(product.images).itemsToPassValidator<Prime.Models.ProductImage>(i => Expect(i.src).toBeType("string"));
    }

    @AsyncTest("should get a product with only one field")
    @Timeout(5000)
    public async Test4() {
        const created = await this.create();
        const product = await this.service.get(created.id, { fields: "id,title" });

        Expect(product.id).toEqual(created.id);
        Expect(Object.getOwnPropertyNames(product).every(key => key === "id" || key === "title")).toBe(true);
    }

    @AsyncTest("should count Products")
    @Timeout(5000)
    public async Test5() {
        const count = await this.service.count();

        Expect(count).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should list Products")
    @Timeout(5000)
    public async Test6() {
        const list = await this.service.list();

        Expect(list).toBeAnArray();
        Expect(list).itemsToPassValidator<Prime.Models.Product>(product => {
            Expect(product.id).toBeGreaterThanOrEqualTo(1);
            Expect(product.title).toBeType("string");
            Expect(product.vendor).toBeType("string");
            Expect(product.product_type).toBeType("string");
        })
    }

    @AsyncTest("should list Products with only specific fields")
    @Timeout(5000)
    public async Test7() {
        const fields = ["id", "title", "vendor", "product_type"];
        const list = await this.service.list({
            fields: fields.join(",")
        });

        Expect(list).toBeAnArray();
        Expect(list).itemsToPassValidator<Prime.Models.Product>(product => {
            Expect(product.id).toBeGreaterThanOrEqualTo(1);
            Expect(product.title).toBeType("string");
            Expect(product.vendor).toBeType("string");
            Expect(product.product_type).toBeType("string");
            Expect(Object.getOwnPropertyNames(product)).itemsToPassValidator<string>(propName => fields.indexOf(propName) !== -1);
        })
    }

    @AsyncTest("should update a product")
    @Timeout(5000)
    public async Test8() {
        const created = await this.create();
        const newTitle = "Product Title Updated by Shopify Prime";
        const updated = await this.service.update(created.id, { ...created, title: newTitle });
        
        Expect(updated.id).toEqual(created.id);
        Expect(updated.title).toEqual(newTitle);
    }
}