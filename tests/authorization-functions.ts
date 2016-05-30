/// <reference path="./../typings/index.d.ts" />

import {expect} from "chai";
import * as config from "./_utils";
import * as auth from "../dist";

describe("Shopify Prime auth functions", function ()
{
    describe(".buildAuthorizationUrl()", () =>
    {
        it ("should build a valid authorization url", () =>
        {
            const url = auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey);
            
            expect(url).to.be.a("string");
            expect(url).to.contain(config.shopDomain);
            expect(url).to.contain(`/admin/oauth/authorize`);
            expect(url).to.contain(`client_id=${config.apiKey}`);
            expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
        });
        
        it ("should build an authorization url with a redirect url", () =>
        {
            const redirect = "https://example.com/my/path?query=string";
            const url = auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey, redirect);
            
            expect(url).to.be.a("string");
            expect(url).to.contain(config.shopDomain);
            expect(url).to.contain(`/admin/oauth/authorize`);
            expect(url).to.contain(`client_id=${config.apiKey}`);
            expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
            expect(url).to.contain(`redirect_url=${encodeURIComponent(redirect)}`);
        })
        
        it ("should build an authorization url with a state", () =>
        {
            const state = "1780650a-2610-46ca-986a-830f4dcb8085";
            const url = auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey, undefined, state);
            
            expect(url).to.be.a("string");
            expect(url).to.contain(config.shopDomain);
            expect(url).to.contain(`/admin/oauth/authorize`);
            expect(url).to.contain(`client_id=${config.apiKey}`);
            expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
            expect(url).to.contain(`state=${state}`);
        })
        
        it ("should build an authorization url with a redirect url and state", () =>
        {
            const redirect = "https://example.com/my/path?query=string";
            const state = "1780650a-2610-46ca-986a-830f4dcb8085";
            const url = auth.buildAuthorizationUrl(["read_orders", "write_orders"], config.shopDomain, config.apiKey, redirect, state);
            
            expect(url).to.be.a("string");
            expect(url).to.contain(config.shopDomain);
            expect(url).to.contain(`/admin/oauth/authorize`);
            expect(url).to.contain(`client_id=${config.apiKey}`);
            expect(url).to.contain(`scope=${encodeURIComponent("read_orders,write_orders")}`);
            expect(url).to.contain(`redirect_url=${encodeURIComponent(redirect)}`);
            expect(url).to.contain(`state=${state}`);
        })
    })
})