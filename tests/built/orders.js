"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const chai_1 = require("chai");
const config = require("./_utils");
const shopify_prime_1 = require("shopify-prime");
describe("Orders", function () {
    this.timeout(30000);
    const service = new shopify_prime_1.Orders(config.shopDomain, config.accessToken);
    const toBeDeleted = [];
    function mockOrder() {
        const order = {
            billing_address: {
                address1: "123 4th Street",
                city: "Minneapolis",
                province: "Minnesota",
                province_code: "MN",
                zip: "55401",
                phone: "555-555-5555",
                first_name: "John",
                last_name: "Doe",
                company: "Tomorrow Corporation",
                country: "United States",
                country_code: "US",
                default: true,
            },
            line_items: [
                {
                    name: "Test Line Item",
                    title: "Test Line Item Title",
                    quantity: 2,
                    price: 5
                },
                {
                    name: "Test Line Item 2",
                    title: "Test Line Item Title 2",
                    quantity: 2,
                    price: 5
                }
            ],
            financial_status: "paid",
            total_price: 5.00,
            email: Date.now + "@example.com",
            note: "Test note about the customer.",
        };
        return order;
    }
    function createOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield service.create(mockOrder(), undefined, { send_receipt: false, send_fulfillment_receipt: false });
            toBeDeleted.push(order);
            return order;
        });
    }
    after((cb) => {
        const count = toBeDeleted.length;
        toBeDeleted.forEach((order) => __awaiter(this, void 0, void 0, function* () { return yield service.delete(order.id); }));
        console.log(`Deleted ${count} orders.`);
        // Wait 1 second to help empty the API rate limit bucket
        setTimeout(cb, 1000);
    });
    it("should delete an order", () => __awaiter(this, void 0, void 0, function* () {
        let error;
        try {
            const order = yield createOrder();
            yield service.delete(order.id);
        }
        catch (e) {
            error = e;
        }
        chai_1.expect(error).to.be.undefined;
    }));
    it("should create an order", () => __awaiter(this, void 0, void 0, function* () {
        const order = yield createOrder();
        chai_1.expect(order).to.be.an("object");
        chai_1.expect(order.contact_email).to.be.a("string");
        chai_1.expect(order.id).to.be.a("number").and.to.be.gte(1);
    }));
    it("should get an order", () => __awaiter(this, void 0, void 0, function* () {
        const id = (yield createOrder()).id;
        const order = yield service.get(id);
        chai_1.expect(order).to.be.an("object");
        chai_1.expect(order.contact_email).to.be.a("string");
        chai_1.expect(order.id).to.be.a("number").and.to.be.gte(1);
    }));
    it("should get an order with only one field", () => __awaiter(this, void 0, void 0, function* () {
        const id = (yield createOrder()).id;
        const order = yield service.get(id, { fields: "id" });
        chai_1.expect(order).to.be.an("object");
        chai_1.expect(order.id).to.be.gte(1);
        chai_1.expect(Object.getOwnPropertyNames(order).every(key => key === "id")).to.be.true;
    }));
    it("should count orders", () => __awaiter(this, void 0, void 0, function* () {
        yield createOrder();
        const count = yield service.count();
        chai_1.expect(count).to.be.gte(1);
    }));
    it("should list orders", () => __awaiter(this, void 0, void 0, function* () {
        yield createOrder();
        const list = yield service.list();
        chai_1.expect(Array.isArray(list)).to.be.true;
        list.forEach(order => {
            chai_1.expect(order).to.be.an("object");
            chai_1.expect(order.id).to.be.gte(1);
            chai_1.expect(order.contact_email).to.be.a("string");
        });
    }));
    it("should update an order", () => __awaiter(this, void 0, void 0, function* () {
        const id = (yield createOrder()).id;
        const note = "Updated note";
        const order = yield service.update(id, { note });
        chai_1.expect(order).to.be.an("object");
        chai_1.expect(order.id).to.be.gte(1);
        chai_1.expect(order.note).to.equal(note);
    }));
    it("should close an order", () => __awaiter(this, void 0, void 0, function* () {
        const id = (yield createOrder()).id;
        const order = yield service.close(id);
        chai_1.expect(order).to.be.an("object");
        chai_1.expect(order.closed_at).to.be.a("string").and.not.be.undefined.and.not.be.null;
    }));
    it("should open an order", () => __awaiter(this, void 0, void 0, function* () {
        const id = (yield createOrder()).id;
        yield service.close(id);
        const order = yield service.open(id);
        chai_1.expect(order).to.be.an("object");
        chai_1.expect(order.closed_at).to.satisfy((closed_at) => closed_at === null || closed_at === undefined);
    }));
});
