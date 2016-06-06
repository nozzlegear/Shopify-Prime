/// <reference path="./../typings/index.d.ts" />

import {expect} from "chai";
import * as config from "./_utils";
import * as auth from "../index";

describe("Shopify Prime auth functions", function ()
{
    describe(".buildAuthorizationUrl()", () =>
    {
        it ("should build a valid authorization url", async () =>
        {
            const url = await auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey);
            
            expect(url).to.be.a("string");
            expect(url).to.contain(config.shopDomain);
            expect(url).to.contain(`/admin/oauth/authorize`);
            expect(url).to.contain(`client_id=${config.apiKey}`);
            expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
        });
        
        it ("should build an authorization url with a redirect url", async () =>
        {
            const redirect = "https://example.com/my/path?query=string";
            const url = await auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey, redirect);
            
            expect(url).to.be.a("string");
            expect(url).to.contain(config.shopDomain);
            expect(url).to.contain(`/admin/oauth/authorize`);
            expect(url).to.contain(`client_id=${config.apiKey}`);
            expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
            expect(url).to.contain(`redirect_uri=${encodeURIComponent(redirect)}`);
        })
        
        it ("should build an authorization url with a state", async () =>
        {
            const state = "1780650a-2610-46ca-986a-830f4dcb8085";
            const url = await auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey, undefined, state);
            
            expect(url).to.be.a("string");
            expect(url).to.contain(config.shopDomain);
            expect(url).to.contain(`/admin/oauth/authorize`);
            expect(url).to.contain(`client_id=${config.apiKey}`);
            expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
            expect(url).to.contain(`state=${state}`);
        })
        
        it ("should build an authorization url with a redirect url and state", async () =>
        {
            const redirect = "https://example.com/my/path?query=string";
            const state = "1780650a-2610-46ca-986a-830f4dcb8085";
            const url = await auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey, redirect, state);
            
            expect(url).to.be.a("string");
            expect(url).to.contain(config.shopDomain);
            expect(url).to.contain(`/admin/oauth/authorize`);
            expect(url).to.contain(`client_id=${config.apiKey}`);
            expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
            expect(url).to.contain(`redirect_uri=${encodeURIComponent(redirect)}`);
            expect(url).to.contain(`state=${state}`);
        })
    })
    
    describe(".isValidShopifyDomain", () =>
    {
        it ("should return true for a valid domain", async (cb) =>
        {
            const isValid = await auth.isValidShopifyDomain(config.shopDomain);
            
            expect(isValid).to.equal(true);
            
            cb();
        });
        
        it ("should return false for an invalid domain", async (cb) =>
        {
            const isValid = await auth.isValidShopifyDomain("example.com");
            
            expect(isValid).to.equal(false);
            
            cb();
        })
    })
    
    describe(".isAuthenticProxyRequest", () =>
    {
        it ("should return true for a valid request", async () =>
        {
            const qs = {
                shop: "stages-test-shop-2.myshopify.com",
                timestamp: "1464592588",
                signature: "e5d8a117dbbe3fd262f25c5ab3ff5c8eacd363b487b5fd2372425d2b6a4dce6b",
                path_prefix: "/apps/stages-tracking-widget-1",
            }
            const result = await auth.isAuthenticProxyRequest(qs, config.secretKey);
            
            expect(result).to.equal(true); 
        });
        
        it ("should return false for an invalid request", async () =>
        {
            const result = await auth.isAuthenticProxyRequest({signature: "abcd"}, config.secretKey);
            
            expect(result).to.equal(false);
        })
    })
    
    describe(".isAuthenticRequest", () =>
    {
        it ("should return true for a valid request", async () =>
        {
            const qs = {
                signature: "1f013145b16c437fa695f7f448ca79ce",
                shop: "stages-test-shop-2.myshopify.com",
                timestamp: "1464593148",
                hmac: "ea89e21116cc3ca8cf8f484f6d7a151f08af5b8c544c42c310c4bd06511247ca",
            }
            const result = await auth.isAuthenticRequest(qs, config.secretKey);
            
            expect(result).to.equal(true);
        })
        
        it ("should return false for an invalid request", async () =>
        {
            const qs = {
                hmac: "abcd"
            }
            const result = await auth.isAuthenticRequest(qs, config.secretKey);
            
            expect(result).to.equal(false);
        })
    })
    
    describe(".isAuthenticWebhook", () =>
    {
        const body = '{"order":{"id":123456}}'; 
        const header = "117448acb11a944b2c30aaef38dcfee66ad51772e602a921aeab8268157ebe3a";
        
        it ("should return true for a valid request with a header string", async () =>
        {
            const result = await auth.isAuthenticWebhook(header, body, config.secretKey);
            
            expect(result).to.equal(true);
        })
        
        it ('should return true for a valid request with a header object', async () =>
        {
            const result = await auth.isAuthenticWebhook({"X-Shopify-Hmac-SHA256": header}, body, config.secretKey);
            
            expect(result).to.equal(true);
        })
        
        it ("should return false for an invalid request", async () =>
        {
            const result = await auth.isAuthenticWebhook({}, body, config.secretKey);
            
            expect(result).to.equal(false);
        })
    })
})