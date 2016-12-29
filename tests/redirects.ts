import { expect } from "chai";
import * as config from "./_utils";
import { Redirects, Models } from "shopify-prime";
import Redirect = Models.Redirect;

describe("Redirects", function () {
    this.timeout(10000);

    const service = new Redirects(config.shopDomain, config.accessToken);
    let r: Redirect

    afterEach((cb) => setTimeout(cb, 500));

    it("should list redirects", async () => {
        const list = await service.list();

        expect(Array.isArray(list)).to.be.true;
    })

    it("should count redirects", async () => {
        const count = await service.count();

        expect(count).to.be.a("number");
        expect(count).to.be.gte(0);
    })

    it("should create a redirect", async () => {
        let newRedirect: Redirect = {
            path: `${config.shopDomain}/primetest`,
            target: `https://www.gooogle.com?q=croatia`
        }

        r = await service.create(newRedirect);

        expect(r).to.not.be.null;
        expect(r.id).to.be.a("number");
    });

    it("should get a redirect by Id", async () => {
        const res = await service.get(r.id)

        expect(res).to.not.be.null;
        expect(res.id).to.not.be.null;
        expect(res.id).to.be.a("number");
        expect(res.path).to.be.a("string");
        expect(res.target).to.be.a("string");
    })

    it("should delete a redirect by Id", async () => {
        await service.delete(r.id)

        try {
            await service.get(r.id)

            throw new Error("Expected an error")

        } catch (err) {
            // Expect a 404 Not Found
            expect(err.statusCode).to.eq(404)
        }
    })

}) 