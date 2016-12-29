import { expect } from "chai";
import * as config from "./_utils";
import { Discounts, Models } from "shopify-prime";
import Discount = Models.Discount;

describe("Discounts", function () {
    this.timeout(10000);

    const service = new Discounts(config.shopDomain, config.accessToken);
    let d: Discount

    it("should create a discount", async () => {
        try {
            let newDiscount: Discount = {
                "discount_type": "percentage",
                "value": "15.0",
                "code": "balderdash"
            }

            // "discount_type": "shipping",
            // "code": "quidagis?",
            // "starts_at": "2015-08-23T00:00:00-04:00",
            // "ends_at": "2015-08-27T23:59:59-04:00",
            // "usage_limit": 20

            d = await service.create(newDiscount);

            expect(d).to.not.be.null;
            expect(d.id).to.be.a("number");

        } catch (err) {
            console.log(err)
            throw err
        }
    });

    it("should get a discount by Id", async () => {
        const res = await service.get(d.id)
        expect(res).to.not.be.null;
        expect(res.id).to.not.be.null;
        expect(res.id).to.be.a("number");

        console.log(res)
    })

    it("should disable a discount by Id", async () => {
        await service.disable(d.id)

        const res = await service.get(d.id)
        expect(res).to.not.be.null;
        expect(res.id).to.eq(d.id);
        expect(res.status).to.eq("disabled");
    })

    it("should enable a discount by Id", async () => {
        await service.enable(d.id)

        const res = await service.get(d.id)
        expect(res).to.not.be.null;
        expect(res.id).to.eq(d.id);
        expect(res.status).to.eq("enabled");
    })

    it("should delete a discount by Id", async () => {
        await service.delete(d.id)

        try {
            await service.get(d.id)

            throw new Error("Expected an error")

        } catch (err) {
            // Expect a 404 Not Found
            expect(err.statusCode).to.eq(404)
        }
    })

}) 