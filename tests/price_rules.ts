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
import { Config, Expect } from './_utils';

@TestFixture("PriceRules Tests")
export class OrderTests {
    private service = new Prime.PriceRules(Config.shopDomain, Config.accessToken);

    private discountService = new Prime.PriceRuleDiscounts(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.PriceRule[] = [];

    private createdDiscounts: { [prId: number]: Prime.Models.PriceRuleDiscountCode[] } = {};

    @AsyncTeardownFixture
    private async teardownAsync() {
        await Promise.all(this.created.map(async created => {
            // Delete children discounts
            if (this.createdDiscounts[created.id]) {
                await Promise.all(this.createdDiscounts[created.id].map(dc => {
                    return this.discountService.delete(created.id, dc.id)
                }));
            }

            await this.service.delete(created.id);
        }));

        inspect(`Deleted ${this.created.length} objects during teardown.`);
    }

    private async create(scheduleForDeletion = true) {
        const obj = await this.service.create({
            title: "Base",
            value_type: "percentage",
            target_type: "line_item",
            target_selection: "all",
            allocation_method: "across",
            value: "-10.0",
            customer_selection: "all",
            once_per_customer: false,
            prerequisite_subtotal_range: {
                greater_than_or_equal_to: 40.0
            },
            starts_at: new Date().toISOString()
        })

        if (scheduleForDeletion) {
            this.created.push(obj);
        };

        return obj;
    }
    
    private async createDiscountCode(ruleId: number, code: string = "unit") {
        const dc = await this.discountService.create(ruleId, {
            code
        });

        // Track discount codes, relative to their owner (price rule)
        if (this.createdDiscounts[ruleId]) {
            this.createdDiscounts[ruleId].push(dc)
        } else {
            this.createdDiscounts[ruleId] = [dc]
        }

        return dc;
    }

    @AsyncTest("should create a price rule")
    @Timeout(5000)
    public async Test1() {
        const pr = await this.create();
        Expect(pr).toBeType("object");
        Expect(pr.title).toBeType("string");
        Expect(pr.id).toBeType("number");
        Expect(pr.id).toBeGreaterThanOrEqualTo(1);

        const dc = await this.createDiscountCode(pr.id)
        Expect(dc).toBeType("object");
        Expect(dc.code).toBeType("string");
        Expect(dc.id).toBeType("number");
        Expect(dc.id).toBeGreaterThanOrEqualTo(1);

        // Throws a 'exceeded max number of discount codes permitted' error for now until shopify change their limits
        try {
            const dc2 = await this.createDiscountCode(pr.id, "unit2")
            Expect(dc2).toBeType("object");
            Expect(dc2.code).toBeType("string");
            Expect(dc2.id).toBeType("number");
            Expect(dc2.id).toBeGreaterThanOrEqualTo(1);
        } catch (err) {
            console.log(err)
        }

    }

    @AsyncTest("should get a price rule")
    @Timeout(5000)
    public async Test2() {
        const id = (await this.create()).id;
        const pr = await this.service.get(id);

        Expect(pr).toBeType("object");
        Expect(pr.title).toBeType("string");
        Expect(pr.id).toBeType("number")
        Expect(pr.id).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should list PriceRules")
    @Timeout(5000)
    public async Test3() {
        await this.create();

        const list = await this.service.list();

        Expect(Array.isArray(list)).toBe(true);
        list.forEach(pr => {
            Expect(pr).toBeType("object");
            Expect(pr.id).toBeGreaterThanOrEqualTo(1);
            Expect(pr.title).toBeType("string");
        })
    }

    @AsyncTest("should update a price rule")
    @Timeout(5000)
    public async Test4() {
        const pr = await this.create();
        pr.value = "-5.0";

        const updated = await this.service.update(pr.id, pr);
        Expect(updated).toBeType("object");
        Expect(updated.id).toBeGreaterThanOrEqualTo(1);
        Expect(updated.value).toEqual(pr.value);
    }

    @AsyncTest("should update a price rule discount code")
    @Timeout(5000)
    public async Test5() {
        const pr = await this.create();

        // Create discount code 
        const dc = await this.createDiscountCode(pr.id, "before")
        Expect(dc).toBeType("object");
        Expect(dc.code).toBeType("string");
        Expect(dc.id).toBeType("number")
        Expect(dc.id).toBeGreaterThanOrEqualTo(1);

        // Update discount code 
        let updatedCode = "after"
        let updated = await this.discountService.update(pr.id, dc.id, { code: updatedCode })
        Expect(updated).toBeType("object");
        Expect(updated.code).toBeType("string");
        Expect(updated.code).toEqual(updatedCode);
    }
}