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

@TestFixture("Shop Tests") 
export class ShopTests {
    private service = new Prime.Shops(Config.shopDomain, Config.accessToken);

    @AsyncTest("should get a shop")
    @Timeout(5000)
    public async Test1() {
        const shop = await this.service.get();

        Expect(shop).not.toBeNull();
        Expect(shop.name).toBeType("string");
        Expect(shop.domain).toBeType("string");
        Expect(shop.address1).toBeType("string");
        Expect(shop.force_ssl).toBeType("boolean");
        Expect(shop.shop_owner).toBeType("string");
        Expect(shop.myshopify_domain).toBeType("string");
    }

    @AsyncTest("should get a shop with only a name field")
    @Timeout(5000)
    public async Test2() {
        const shop = await this.service.get({ fields: "name" });

        Expect(shop).not.toBeNull();
        Expect(Object.getOwnPropertyNames(shop).length).toEqual(1);
        Expect(shop.name).toBeType("string");
    }

    @AsyncTest("should force uninstall the app") 
    @IgnoreTest("cannot be tested with a private app")
    public async Test3() { }
}