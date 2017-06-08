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

@TestFixture("Order Tests")
export class OrderTests {
    private service = new Prime.Orders(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.Order[] = [];

    @AsyncTeardownFixture
    private async teardownAsync() {
        await Promise.all(this.created.map(created => this.service.delete(created.id)));

        inspect(`Deleted ${this.created.length} objects during teardown.`);

        // Wait 2 seconds after all tests to let the API rate limit bucket empty.
        inspect("Waiting 2 seconds to let API rate limit empty.")
        
        await new Promise(resolve => setTimeout(() => {
            inspect("Continuing.")
            resolve();
        }, 2000));
    }

    private async create(scheduleForDeletion = true) {
        const obj = await this.service.create({
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
        }, undefined, { send_receipt: false, send_fulfillment_receipt: false })

        if (scheduleForDeletion) {
            this.created.push(obj);
        };

        return obj;
    }

    @AsyncTest("should delete an order")
    @Timeout(5000)
    public async Test1() {
        let error;

        try {
            const order = await this.create();

            await this.service.delete(order.id);
        } catch (e) {
            error = e;
        }

        Expect(error).toBeNullOrUndefined();
    }

    @AsyncTest("should create an order")
    @Timeout(5000)
    public async Test2() {
        const order = await this.create();

        Expect(order).toBeType("object");
        Expect(order.contact_email).toBeType("string");
        Expect(order.id).toBeType("number")
        Expect(order.id).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should get an order")
    @Timeout(5000)
    public async Test3() {
        const id = (await this.create()).id;
        const order = await this.service.get(id);

        Expect(order).toBeType("object");
        Expect(order.contact_email).toBeType("string");
        Expect(order.id).toBeType("number")
        Expect(order.id).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should create an order with only one field")
    @Timeout(5000)
    public async Test4() {
        const id = (await this.create()).id;
        const order = await this.service.get(id, { fields: "id" })

        Expect(order).toBeType("object");
        Expect(order.id).toBeGreaterThanOrEqualTo(1);
        Expect(Object.getOwnPropertyNames(order).every(key => key === "id")).toBe(true);
    }

    @AsyncTest("should count orders")
    @Timeout(5000)
    public async Test5() {
        await this.create();

        const count = await this.service.count();

        Expect(count).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should list orders")
    @Timeout(5000)
    public async Test6() {
        await this.create();

        const list = await this.service.list();

        Expect(Array.isArray(list)).toBe(true);
        list.forEach(order => {
            Expect(order).toBeType("object");
            Expect(order.id).toBeGreaterThanOrEqualTo(1);
            Expect(order.contact_email).toBeType("string");
        })
    }

    @AsyncTest("should update an order")
    @Timeout(5000)
    public async Test7() {
        const id = (await this.create()).id;
        const note = "Updated note";
        const order = await this.service.update(id, { note })

        Expect(order).toBeType("object");
        Expect(order.id).toBeGreaterThanOrEqualTo(1);
        Expect(order.note).toEqual(note);
    }

    @AsyncTest("should close an order")
    @Timeout(5000)
    public async Test8() {
        const id = (await this.create()).id;
        const order = await this.service.close(id);

        Expect(order).toBeType("object");
        Expect(order.closed_at).toBeType("string")
        Expect(order.closed_at).not.toBeNullOrUndefined();
    }

    @AsyncTest("should open an order")
    @Timeout(5000)
    public async Test9() {
        const id = (await this.create()).id;

        await this.service.close(id);

        const order = await this.service.open(id);

        Expect(order).toBeType("object");
        Expect(order.closed_at).toBeNullOrUndefined();
    }

    @AsyncTest("should cancel an order")
    @Timeout(5000)
    public async Test10() {
        const id = (await this.create()).id;
        const order = await this.service.cancel(id);
    
        Expect(order).toBeType("object");
        Expect(order.id).toEqual(id);
    }

    @AsyncTest("should cancel an order with options")
    @Timeout(5000)
    public async Test11() {
        const id = (await this.create()).id;
        const order = await this.service.cancel(id, {
            reason: "customer",
        })

        Expect(order).toBeType("object");
        Expect(order.id).toEqual(id);
    }
}