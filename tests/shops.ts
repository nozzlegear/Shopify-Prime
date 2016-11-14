import { expect } from "chai";
import { Shops, Models } from "shopify-prime";
import * as config from "./_utils";
import Shop = Models.Shop;

describe("Shops", function () {
    this.timeout(30000);
    
    const service = new Shops(config.shopDomain, config.accessToken);

    after((cb) => {
        // Wait 1 second to help empty the API rate limit bucket
        setTimeout(cb, 1000);    
    })

    it("should get a shop", async () => {
        const shop = await service.get();

        expect(shop).to.not.be.null;
        expect(shop.name).to.be.a("string");
        expect(shop.domain).to.be.a("string");
        expect(shop.address1).to.be.a("string");
        expect(shop.force_ssl).to.be.a("boolean");
        expect(shop.shop_owner).to.be.a("string");
        expect(shop.myshopify_domain).to.be.a("string");
    });

    it("should get a shop with only a name field", async () => {
        const shop = await service.get({ fields: "name" });

        expect(shop).to.not.be.null;
        expect(Object.getOwnPropertyNames(shop).length).to.equal(1);
        expect(shop.name).to.be.a("string");
    })

    it("should force uninstall the app, but cannot be tested with a private app");
}) 