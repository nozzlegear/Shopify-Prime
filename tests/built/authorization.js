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
describe("Shopify Prime auth functions", function () {
    describe(".buildAuthorizationUrl()", () => {
        it("should build a valid authorization url", () => __awaiter(this, void 0, void 0, function* () {
            const url = yield shopify_prime_1.Auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey);
            chai_1.expect(url).to.be.a("string");
            chai_1.expect(url).to.contain(config.shopDomain);
            chai_1.expect(url).to.contain(`/admin/oauth/authorize`);
            chai_1.expect(url).to.contain(`client_id=${config.apiKey}`);
            chai_1.expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
        }));
        it("should build an authorization url with a redirect url", () => __awaiter(this, void 0, void 0, function* () {
            const redirect = "https://example.com/my/path?query=string";
            const url = yield shopify_prime_1.Auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey, redirect);
            chai_1.expect(url).to.be.a("string");
            chai_1.expect(url).to.contain(config.shopDomain);
            chai_1.expect(url).to.contain(`/admin/oauth/authorize`);
            chai_1.expect(url).to.contain(`client_id=${config.apiKey}`);
            chai_1.expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
            chai_1.expect(url).to.contain(`redirect_uri=${encodeURIComponent(redirect)}`);
        }));
        it("should build an authorization url with a state", () => __awaiter(this, void 0, void 0, function* () {
            const state = "1780650a-2610-46ca-986a-830f4dcb8085";
            const url = yield shopify_prime_1.Auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey, undefined, state);
            chai_1.expect(url).to.be.a("string");
            chai_1.expect(url).to.contain(config.shopDomain);
            chai_1.expect(url).to.contain(`/admin/oauth/authorize`);
            chai_1.expect(url).to.contain(`client_id=${config.apiKey}`);
            chai_1.expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
            chai_1.expect(url).to.contain(`state=${state}`);
        }));
        it("should build an authorization url with a redirect url and state", () => __awaiter(this, void 0, void 0, function* () {
            const redirect = "https://example.com/my/path?query=string";
            const state = "1780650a-2610-46ca-986a-830f4dcb8085";
            const url = yield shopify_prime_1.Auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey, redirect, state);
            chai_1.expect(url).to.be.a("string");
            chai_1.expect(url).to.contain(config.shopDomain);
            chai_1.expect(url).to.contain(`/admin/oauth/authorize`);
            chai_1.expect(url).to.contain(`client_id=${config.apiKey}`);
            chai_1.expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
            chai_1.expect(url).to.contain(`redirect_uri=${encodeURIComponent(redirect)}`);
            chai_1.expect(url).to.contain(`state=${state}`);
        }));
    });
    describe(".isValidShopifyDomain", () => {
        it("should return true for a valid domain", () => __awaiter(this, void 0, void 0, function* () {
            const isValid = yield shopify_prime_1.Auth.isValidShopifyDomain(config.shopDomain);
            chai_1.expect(isValid).to.be.true;
        }));
        it("should return false for an invalid domain", () => __awaiter(this, void 0, void 0, function* () {
            const isValid = yield shopify_prime_1.Auth.isValidShopifyDomain("example.com");
            chai_1.expect(isValid).to.equal(false);
        }));
    });
    describe(".isAuthenticProxyRequest", () => {
        it("should return true for a valid request", () => __awaiter(this, void 0, void 0, function* () {
            const qs = {
                shop: "stages-test-shop-2.myshopify.com",
                timestamp: "1464592588",
                signature: "e5d8a117dbbe3fd262f25c5ab3ff5c8eacd363b487b5fd2372425d2b6a4dce6b",
                path_prefix: "/apps/stages-tracking-widget-1",
            };
            const result = yield shopify_prime_1.Auth.isAuthenticProxyRequest(qs, config.secretKey);
            chai_1.expect(result).to.equal(true);
        }));
        it("should return false for an invalid request", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield shopify_prime_1.Auth.isAuthenticProxyRequest({ signature: "abcd" }, config.secretKey);
            chai_1.expect(result).to.equal(false);
        }));
    });
    describe(".isAuthenticRequest", () => {
        it("should return true for a valid request", () => __awaiter(this, void 0, void 0, function* () {
            const qs = {
                signature: "1f013145b16c437fa695f7f448ca79ce",
                shop: "stages-test-shop-2.myshopify.com",
                timestamp: "1464593148",
                hmac: "ea89e21116cc3ca8cf8f484f6d7a151f08af5b8c544c42c310c4bd06511247ca",
            };
            const result = yield shopify_prime_1.Auth.isAuthenticRequest(qs, config.secretKey);
            chai_1.expect(result).to.equal(true);
        }));
        it("should return false for an invalid request", () => __awaiter(this, void 0, void 0, function* () {
            const qs = {
                hmac: "abcd"
            };
            const result = yield shopify_prime_1.Auth.isAuthenticRequest(qs, config.secretKey);
            chai_1.expect(result).to.equal(false);
        }));
    });
    describe(".isAuthenticWebhook", () => {
        const body = '{"order":{"id":123456}}';
        const header = "117448acb11a944b2c30aaef38dcfee66ad51772e602a921aeab8268157ebe3a";
        it("should return true for a valid request with a header string", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield shopify_prime_1.Auth.isAuthenticWebhook(header, body, config.secretKey);
            chai_1.expect(result).to.equal(true);
        }));
        it('should return true for a valid request with a header object', () => __awaiter(this, void 0, void 0, function* () {
            const result = yield shopify_prime_1.Auth.isAuthenticWebhook({ "X-Shopify-Hmac-SHA256": header }, body, config.secretKey);
            chai_1.expect(result).to.equal(true);
        }));
        it("should return false for an invalid request", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield shopify_prime_1.Auth.isAuthenticWebhook({}, body, config.secretKey);
            chai_1.expect(result).to.equal(false);
        }));
    });
});
