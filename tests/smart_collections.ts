import { expect } from "chai";
import * as config from "./_utils";
import { SmartCollections, Products, Models } from "shopify-prime";
import Product = Models.Product;
import SmartCollection = Models.SmartCollection;

describe("SmartCollection", function () {
    this.timeout(30000);

    const service = new SmartCollections(config.shopDomain, config.accessToken);
    // const toBeDeleted: Product[] = [];

    // function mockProduct() {
    //     const product: Product = {

    //     };

    //     return product;
    // }

    // async function createOrder() {
    //     const product = await service.create(mockProduct(), undefined, { send_receipt: false, send_fulfillment_receipt: false });

    //     toBeDeleted.push(product);

    //     return product;
    // }

    // afterEach((cb) => setTimeout(cb, 500));

    // after((cb) => {
    //     const count = toBeDeleted.length;

    //     toBeDeleted.forEach(async (product) => await service.delete(product.id));

    //     console.log(`Deleted ${count} Products.`);

    //     // Wait 1 second to help empty the API rate limit bucket
    //     setTimeout(cb, 1000);
    // })

    // it("should delete an product", async () => {
    //     let error;

    //     try {
    //         const product = await createOrder();

    //         await service.delete(product.id);
    //     } catch (e) {
    //         error = e;
    //     }

    //     expect(error).to.be.undefined;
    // });

    // it("should create an product", async () => {
    //     const product = await createOrder();

    //     expect(product).to.be.an("object");
    //     expect(product.contact_email).to.be.a("string");
    //     expect(product.id).to.be.a("number").and.to.be.gte(1);
    // });

    // it("should get an product", async () => {
    //     const id = (await createOrder()).id;
    //     const product = await service.get(id);

    //     expect(product).to.be.an("object");
    //     expect(product.contact_email).to.be.a("string");
    //     expect(product.id).to.be.a("number").and.to.be.gte(1);
    // });

    // it("should get an product with only one field", async () => {
    //     const id = (await createOrder()).id;
    //     const product = await service.get(id, { fields: "id" });

    //     expect(product).to.be.an("object");
    //     expect(product.id).to.be.gte(1);
    //     expect(Object.getOwnPropertyNames(product).every(key => key === "id")).to.be.true;
    // });

    it("should count collections", async () => {
        // await createOrder();

        const count = await service.count();
        console.log(count)
        expect(count).to.be.gte(1);
    });

    it("should list collections", async () => {
        // await createOrder();

        const list = await service.list();
        console.log(list)
        expect(Array.isArray(list)).to.be.true;
        list.forEach(product => {
            expect(product).to.be.an("object");
            expect(product.id).to.be.gte(1);
            // expect(product.contact_email).to.be.a("string");
        })
    });

    // it("should update an product", async () => {
    //     const id = (await createOrder()).id;
    //     const note = "Updated note";
    //     const product = await service.update(id, { note });

    //     expect(product).to.be.an("object");
    //     expect(product.id).to.be.gte(1);
    //     expect(product.note).to.equal(note);
    // })

    // it("should close an product", async () => {
    //     const id = (await createOrder()).id;
    //     const product = await service.close(id);

    //     expect(product).to.be.an("object");
    //     expect(product.closed_at).to.be.a("string").and.not.be.undefined.and.not.be.null;
    // })

    // it("should open an product", async () => {
    //     const id = (await createOrder()).id;

    //     await service.close(id);

    //     const product = await service.open(id);

    //     expect(product).to.be.an("object");
    //     expect(product.closed_at).to.satisfy((closed_at) => closed_at === null || closed_at === undefined);
    // })

    // it("should cancel an product", async () => {
    //     const id = (await createOrder()).id;
    //     const product = await service.cancel(id);

    //     expect(product).to.be.an("object");
    //     expect(product.id).to.equal(id);
    // })

    // it("should cancel an product with options", async () => {
    //     const id = (await createOrder()).id;
    //     const product = await service.cancel(id, {
    //         reason: "customer",
    //     })

    //     expect(product).to.be.an("object");
    //     expect(product.id).to.equal(id);
    // })
});