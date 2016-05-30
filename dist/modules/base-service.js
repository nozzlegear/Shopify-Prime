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
const uri = require("jsuri");
const qs_1 = require("qs");
const shopify_error_1 = require("./shopify-error");
const fetch = require("isomorphic-fetch");
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
                throw new shopify_error_1.ShopifyError(result, json);
            }
            return rootElement ? json[rootElement] : json;
        });
    }
}
exports.BaseService = BaseService;
