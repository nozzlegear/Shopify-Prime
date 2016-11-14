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
const shopify_prime_1 = require("shopify-prime");
const config = require("./_utils");
describe("Shops", function () {
    this.timeout(30000);
    const service = new shopify_prime_1.Shops(config.shopDomain, config.accessToken);
    after((cb) => {
        // Wait 1 second to help empty the API rate limit bucket
        setTimeout(cb, 1000);
    });
    it("should get a shop", () => __awaiter(this, void 0, void 0, function* () {
        const shop = yield service.get();
        chai_1.expect(shop).to.not.be.null;
        chai_1.expect(shop.name).to.be.a("string");
        chai_1.expect(shop.domain).to.be.a("string");
        chai_1.expect(shop.address1).to.be.a("string");
        chai_1.expect(shop.force_ssl).to.be.a("boolean");
        chai_1.expect(shop.shop_owner).to.be.a("string");
        chai_1.expect(shop.myshopify_domain).to.be.a("string");
    }));
    it("should get a shop with only a name field", () => __awaiter(this, void 0, void 0, function* () {
        const shop = yield service.get({ fields: "name" });
        chai_1.expect(shop).to.not.be.null;
        chai_1.expect(Object.getOwnPropertyNames(shop).length).to.equal(1);
        chai_1.expect(shop.name).to.be.a("string");
    }));
    it("should force uninstall the app, but cannot be tested with a private app");
});
