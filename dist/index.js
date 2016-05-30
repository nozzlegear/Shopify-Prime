/// <reference path="./typings/index.d.ts" />
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
const base_service_1 = require("./modules/base-service");
exports.BaseService = base_service_1.BaseService;
const fetch = require("node-fetch");
function isAuthenticRequest() {
    throw new Error("Not Implemented");
}
exports.isAuthenticRequest = isAuthenticRequest;
function isAuthenticProxyRequest() {
    throw new Error("Not Implemented");
}
exports.isAuthenticProxyRequest = isAuthenticProxyRequest;
function isAuthenticWebhook() {
    throw new Error("Not Implemented");
}
exports.isAuthenticWebhook = isAuthenticWebhook;
/**
 * A convenience function that tries to ensure that a given URL is a valid Shopify store by checking the response headers for X-ShopId. This is an undocumented feature, use at your own risk.
 */
function isValidShopifyDomain(shopifyDomain) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new uri(shopifyDomain);
        url.protocol("https");
        url.path("/admin");
        const response = yield fetch(url.toString(), {
            method: "HEAD",
            headers: base_service_1.BaseService.buildDefaultHeaders(),
        });
        return response.headers.has("X-ShopId");
    });
}
exports.isValidShopifyDomain = isValidShopifyDomain;
/**
 * Builds an authorization URL for Shopify OAuth integration. Send your user to this URL where they'll be asked to accept installation of your Shopify app.
 * @param scopes An array of scope permissions that your app will need from the user.
 * @param shopifyDomain The user's Shopify URL.
 * @param shopifyApiKey Your app's API key. This is NOT your secret key.
 * @param redirectUrl An optional URL that the user will be sent to after integration. Override's the Shopify app's default redirect URL.
 * @param state An optional, random string value provided by your application which is unique for each authorization request. During the OAuth callback phase, your application should check that this value matches the one you provided to this method.
 */
function buildAuthorizationUrl(scopes, shopifyDomain, shopifyApiKey, redirectUrl, state) {
    const url = new uri(shopifyDomain);
    url.protocol("https");
    url.path("admin/oauth/authorize");
    url.addQueryParam("client_id", shopifyApiKey);
    url.addQueryParam("scope", scopes.join(","));
    if (redirectUrl) {
        url.addQueryParam("redirect_url", redirectUrl);
    }
    if (state) {
        url.addQueryParam("state", state);
    }
    return url.toString();
}
exports.buildAuthorizationUrl = buildAuthorizationUrl;
function authorize() {
    throw new Error("Not Implemented");
}
exports.authorize = authorize;
var shopify_error_1 = require("./modules/shopify-error");
exports.ShopifyError = shopify_error_1.ShopifyError;
