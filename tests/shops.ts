/// <reference path="../typings/index.d.ts" />

import {expect} from "chai";
import * as config from "./_utils";
import {Shops, Shop} from "../dist";

describe("Shops", function () 
{
    const service = new Shops(config.shopDomain, config.accessToken);
    
    it ("should get a shop", async () => 
    {
        const shop = await service.get();
        
        expect(shop).to.not.be.null;
        expect(shop.name).to.be.a("string");
        expect(shop.domain).to.be.a("string");
        expect(shop.address1).to.be.a("string");
        expect(shop.force_ssl).to.be.a("boolean");
        expect(shop.shop_owner).to.be.a("string");
        expect(shop.myshopify_domain).to.be.a("string");
    });
    
    it ("should force uninstall the app, but cannot be tested with a private app");
}) 