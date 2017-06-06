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

@TestFixture("Prime.Auth.buildAuthorizationUrl tests")
export class BuildAuthorizationUrlTests {
    @AsyncTest("should build a valid authorization url")
    @Timeout(5000)
    public async Test1() {
        const url = await Prime.Auth.buildAuthorizationUrl(["read_orders", "write_orders"], Config.shopDomain, Config.apiKey);

        Expect(url).toBeType("string");
        Expect(url).toContain(Config.shopDomain);
        Expect(url).toContain(`/admin/oauth/authorize`);
        Expect(url).toContain(`client_id=${Config.apiKey}`);
        Expect(url).toContain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
    }

    @AsyncTest("should build an authorization url with a redirect url")
    @Timeout(5000)
    public async Test2() {
        const redirect = "https://example.com/my/path?query=string";
        const url = await Prime.Auth.buildAuthorizationUrl(["read_orders", "write_orders"], Config.shopDomain, Config.apiKey, redirect);

        Expect(url).toBeType("string");
        Expect(url).toContain(Config.shopDomain);
        Expect(url).toContain(`/admin/oauth/authorize`);
        Expect(url).toContain(`client_id=${Config.apiKey}`);
        Expect(url).toContain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
        Expect(url).toContain(`redirect_uri=${encodeURIComponent(redirect)}`);
    }

    @AsyncTest("should build an authorization url with a state")
    @Timeout(5000)
    public async Test3() {
        const state = "1780650a-2610-46ca-986a-830f4dcb8085";
        const url = await Prime.Auth.buildAuthorizationUrl(["read_orders", "write_orders"], Config.shopDomain, Config.apiKey, undefined, state);

        Expect(url).toBeType("string");
        Expect(url).toContain(Config.shopDomain);
        Expect(url).toContain(`/admin/oauth/authorize`);
        Expect(url).toContain(`client_id=${Config.apiKey}`);
        Expect(url).toContain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
        Expect(url).toContain(`state=${state}`);
    }

    @AsyncTest("should build an authorization url with a redirect url and state")
    @Timeout(5000)
    public async Test4() {
        const redirect = "https://example.com/my/path?query=string";
        const state = "1780650a-2610-46ca-986a-830f4dcb8085";
        const url = await Prime.Auth.buildAuthorizationUrl(["read_orders", "write_orders"], Config.shopDomain, Config.apiKey, redirect, state);

        Expect(url).toBeType("string");
        Expect(url).toContain(Config.shopDomain);
        Expect(url).toContain(`/admin/oauth/authorize`);
        Expect(url).toContain(`client_id=${Config.apiKey}`);
        Expect(url).toContain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
        Expect(url).toContain(`redirect_uri=${encodeURIComponent(redirect)}`);
        Expect(url).toContain(`state=${state}`);
    }

    @AsyncTest("should build an authorization url with grant permissions")
    @Timeout(5000)
    public async Test5() {
        const redirect = "https://example.com/my/path?query=string";
        const state = "1780650a-2610-46ca-986a-830f4dcb8085";
        const url = await Prime.Auth.buildAuthorizationUrl(["read_orders", "write_orders"], Config.shopDomain, Config.apiKey, redirect, undefined, ["per-user"]);

        Expect(url).toBeType("string");
        Expect(url).toContain(Config.shopDomain);
        Expect(url).toContain(`/admin/oauth/authorize`);
        Expect(url).toContain(`client_id=${Config.apiKey}`);
        Expect(url).toContain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
        Expect(url).toContain(`redirect_uri=${encodeURIComponent(redirect)}`);
        Expect(url).toContain(`grant_options[]=${encodeURIComponent('per-user')}`);
        Expect(url).not.toContain(`state=${state}`);
    }
}

@TestFixture("Prime.Auth.isValidShopifyDomain tests")
export class IsValidShopifyDomainTests {
    @AsyncTest("should return true for a valid domain")
    @Timeout(5000)
    public async Test1() {
        const isValid = await Prime.Auth.isValidShopifyDomain(Config.shopDomain);

        Expect(isValid).toBe(true);
    }

    @AsyncTest("should return false for an invalid domain")
    @Timeout(5000)
    public async Test2() {
        const isValid = await Prime.Auth.isValidShopifyDomain("example.com");

        Expect(isValid).toEqual(false);
    }
}

@TestFixture("Prime.Auth.isAuthenticProxyRequest tests")
export class IsAuthenticProxyRequestTests {
    @AsyncTest("should return true for a valid request")
    @Timeout(5000)
    public async Test1() {
        const qs = {
            shop: "stages-test-shop-2.myshopify.com",
            timestamp: "1464592588",
            signature: "e5d8a117dbbe3fd262f25c5ab3ff5c8eacd363b487b5fd2372425d2b6a4dce6b",
            path_prefix: "/apps/stages-tracking-widget-1",
        }
        const result = await Prime.Auth.isAuthenticProxyRequest(qs, Config.secretKey);

        Expect(result).toEqual(true);
    }

    @AsyncTest("should return false for an invalid request")
    @Timeout(5000)
    public async Test2() {
        const result = await Prime.Auth.isAuthenticProxyRequest({ signature: "abcd" }, Config.secretKey);

        Expect(result).toEqual(false);
    }
}

@TestFixture("Prime.Auth.isAuthenticRequest tests")
export class IsAuthenticRequestTests {
    @AsyncTest("should return true for a valid request")
    @Timeout(5000)
    public async Test1() {
        const qs = {
            signature: "1f013145b16c437fa695f7f448ca79ce",
            shop: "stages-test-shop-2.myshopify.com",
            timestamp: "1464593148",
            hmac: "ea89e21116cc3ca8cf8f484f6d7a151f08af5b8c544c42c310c4bd06511247ca",
        }
        const result = await Prime.Auth.isAuthenticRequest(qs, Config.secretKey);

        Expect(result).toEqual(true);
    }

    @AsyncTest("should return false for an invalid request")
    @Timeout(5000)
    public async Test2() {
        const qs = {
            hmac: "abcd"
        }
        const result = await Prime.Auth.isAuthenticRequest(qs, Config.secretKey);

        Expect(result).toEqual(false);
    }
}

@TestFixture("Prime.Auth.isAuthenticWebhook tests")
export class IsAuthenticWebhookTests {
    private body = '{"order":{"id":123456}}';
    private header = "EXRIrLEalEssMKrvONz+5mrVF3LmAqkhrquCaBV+vjo=";

    @AsyncTest("should return true for a valid request with a header string")
    @Timeout(5000)
    public async Test1() {
        const result = await Prime.Auth.isAuthenticWebhook(this.header, this.body, Config.secretKey);

        Expect(result).toEqual(true);
    }

    @AsyncTest('should return true for a valid request with a header object')
    @Timeout(5000)
    public async Test2() {
        const result = await Prime.Auth.isAuthenticWebhook({ "X-Shopify-Hmac-SHA256": this.header }, this.body, Config.secretKey);

        Expect(result).toEqual(true);
    }

    @AsyncTest('should return true for a valid request with a header object and lowercase header name')
    @Timeout(5000)
    public async Test3() {
        const result = await Prime.Auth.isAuthenticWebhook({ "x-shopify-hmac-sha256": this.header }, this.body, Config.secretKey);

        Expect(result).toEqual(true);
    }

    @AsyncTest("should return false for an invalid request")
    @Timeout(5000)
    public async Test4() {
        const result = await Prime.Auth.isAuthenticWebhook({}, this.body, Config.secretKey);

        Expect(result).toEqual(false);
    }
}