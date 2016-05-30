/// <reference path="./../typings/index.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const qs_1 = require("qs");
const uri = require("jsuri");
const fetch = require("isomorphic-fetch");
class ShopifyError extends Error {
    constructor(response, body) {
        super();
        this.body = body;
        this.errors = {};
        this.statusCode = response.status;
        this.statusText = response.statusText;
        this.message = `[Shopify Prime] ${this.statusCode} ${this.statusText}. `;
        // Errors can be any of the following: 
        // 1. { errors: "some error message"}
        // 2. { errors: { "order" : "some error message" } }
        // 3. { errors: { "order" : [ "some error message" ] } }
        let errors = body.errors;
        if (!errors) {
            return;
        }
        if (typeof errors === "string") {
            // errors is #1
            this.errors["generic"] = [errors];
        }
        else if (typeof errors === "object") {
            for (const property in errors) {
                const value = errors[property];
                this.errors[property] = Array.isArray(value) ? value : [value];
            }
        }
    }
    get isShopifyPrime() {
        return true;
    }
}
exports.ShopifyError = ShopifyError;
class BaseService {
    constructor(shopDomain, accessToken, resource) {
        this.shopDomain = shopDomain;
        this.accessToken = accessToken;
        this.resource = resource;
    }
    setCredentials(shopDomain, accessToken) {
        this.shopDomain = shopDomain;
        this.accessToken = accessToken;
    }
    createRequest(method, path, rootElement, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            method = method.toUpperCase();
            const headers = new fetch.Headers();
            headers.append("Accept", "application/json");
            if (this.accessToken) {
                headers.append("X-Shopify-Access-Token", this.accessToken);
            }
            const url = new uri(this.shopDomain);
            url.protocol("https");
            url.path(`${this.resource}/${path}`);
            if ((method === "GET" || method === "DELETE") && payload) {
                url.query(qs_1.stringify(payload));
            }
            else if (payload) {
                headers.append("Content-Type", "application/json");
            }
            //Fetch will only throw an exception when there is a network-related error, not when Shopify returns a non-200 response.
            const result = yield fetch(url.toString(), {
                headers: headers,
                method: method,
                body: payload && JSON.stringify(payload)
            });
            const json = yield result.json();
            if (!result.ok) {
                throw new ShopifyError(result, json);
            }
            return rootElement ? json[rootElement] : json;
        });
    }
}
exports.BaseService = BaseService;
