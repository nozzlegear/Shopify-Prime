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
import { Config, Expect } from './test_utils';

@TestFixture("Product Tests")
export class ProductTests {
    private service = new Prime.Products(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.Product[] = [];

    @AsyncTeardownFixture
    private async teardownAsync() {
        //await Promise.all(this.created.map(created => this.service.delete(created.id)));

        inspect(`Deleted ${this.created.length} objects during teardown.`);
    }

    private async create(scheduleForDeletion = true) {
        // const obj = await this.service.create({

        // });

        // if (scheduleForDeletion) {
        //     this.created.push(obj);
        // };

        // return obj;

        return {} as Prime.Models.Product;
    }

    @AsyncTest("should delete a product")
    @Timeout(5000)
    public async Test1() { 
        const product = await this.create();
        let error;

        try {
            //await this.service.delete(product.id);
            throw new Error("Not implemented.");
        } catch (e) {
            error = e;
        }

        Expect(error).toBeNullOrUndefined();
    }

    @AsyncTest("should create a product")
    @Timeout(5000)
    public async Test2() { 
        const product = await this.create();

        Expect(product).toBeType("object");
        Expect(product.id).toBeType("number");
        Expect(product.id).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should get a product")
    @Timeout(5000)
    public async Test3() { 
        throw new Error("Not implemented.");
        // const id = (await this.create()).id;
        // const product = await this.service.get(id);

        // Expect(product).toBeType("object");
        // Expect(product.contact_email).toBeType("string");
        // Expect(product.id).toBeType("number");
        // Expect(product.id).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should get a product with only one field")
    @Timeout(5000)
    public async Test4() { 
        throw new Error("Not implemented.");
        // const id = (await this.create()).id;
        // const product = await this.service.get(id, { fields: "id" });

        // Expect(product).toBeType("object");
        // Expect(product.id).toBeGreaterThanOrEqualTo(1);
        // Expect(Object.getOwnPropertyNames(product).every(key => key === "id")).toBe(true);
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
        Expect(list).itemsToPassValidator<Prime.Models.Product>(item => {
            Expect(item.id).toBeGreaterThanOrEqualTo(1);
        })
    }

    @AsyncTest("should list Products with only specific fields")
    @Timeout(5000)
    public async Test7() {
        const list = await this.service.list({
            fields: "id,title,vendor,product_type"
        });
        
        Expect(list).toBeAnArray();
        Expect(list).itemsToPassValidator<Prime.Models.Product>(product => {
            Expect(product).toBeType("object");
            Expect(product.id).toBeGreaterThanOrEqualTo(1);
            Expect(product.title).toBeType("string");
            Expect(product.vendor).toBeType("string");
            Expect(product.product_type).toBeType("string");
        })
    }

    @AsyncTest("should update a product")
    @Timeout(5000)
    public async Test8() { 
        throw new Error("Not implemented.");
        
        // const id = (await this.create()).id;
        // const note = "Updated note";
        // const product = await this.service.update(id, { note });

        // Expect(product).toBeType("object");
        // Expect(product.id).toBeGreaterThanOrEqualTo(1);
        // Expect(product.note).toEqual(note);
    }

    @AsyncTest("should close a product")
    @Timeout(5000)
    public async Test9() { 
        throw new Error("Not implemented.");

        // const id = (await this.create()).id;
        // const product = await this.service.close(id);

        // Expect(product).toBeType("object");
        // Expect(product.closed_at).toBeType("string")
        // Expect(product.closed_at).not.toBeNullOrUndefined();
    }

    @AsyncTest("should open a product")
    @Timeout(5000)
    public async Test10() { 
        throw new Error("Not implemented.");
        
        // const id = (await this.create()).id;

        // await this.service.close(id);

        // const product = await this.service.open(id);

        // Expect(product).toBeType("object");
        // Expect(product.closed_at).toBeNullOrUndefined();
    }

    @AsyncTest("should cancel a product")
    @Timeout(5000)
    public async Test11() { 
        throw new Error("Not implemented.");

        // const id = (await this.create()).id;
        // const product = await this.service.cancel(id);

        // Expect(product).toBeType("object");
        // Expect(product.id).toEqual(id);
    }

    @AsyncTest("should cancel a product with options")
    @Timeout(5000)
    public async Test12() { 
        throw new Error("Not implemented.");
        
        // const id = (await this.create()).id;
        // const product = await this.service.cancel(id, {
        //     reason: "customer",
        // })

        // Expect(product).toBeType("object");
        // Expect(product.id).toEqual(id);
    }
}