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
const crypto = require("crypto-js");
const fetch = require("node-fetch");
const infrastructure_1 = require("../infrastructure");
/**
 * Replaces special querystring characters when calculating an authenticity signature in @isAuthenticRequest and @isAuthenticProxyRequest.
 */
function replaceChars(s, isKey) {
    if (!s) {
        return "";
    }
    let output = s.replace(/%/ig, "%25").replace(/&/ig, "%26");
    if (isKey) {
        output = output.replace(/=/ig, "%3D");
    }
    return output;
}
function buildHashString(type, querystring) {
    // To calculate signature:
    // 1. Cast querystring to KVP pairs.
    // 2. Remove `signature` and `hmac` keys.
    // 3. Replace & with %26, % with %25 in keys and values.
    // 4. Replace = with %3D in keys only.
    // 5. Join each key and value with = (key=value).
    // 6. Sorty kvps alphabetically.
    // 7. Join kvps together with & in a web request (key=value&key=value&key=value) and null in a proxy request (key=valuekey=value).
    // 8. Compute the kvps with an HMAC-SHA256 using the secret key.
    // 9. Request is authentic if the computed string equals the `hmac` (web) or 'signature' (proxy) in querystring.
    // Reference: https://docs.shopify.com/api/guides/authentication/oauth#making-authenticated-requests
    const kvps = Object.getOwnPropertyNames(querystring)
        .filter((key) => key !== "signature" && key !== "hmac")
        .sort()
        .map(key => `${replaceChars(key, true)}=${replaceChars(querystring[key], false)}`)
        .join(type === "web" ? "&" : "");
    return kvps;
}
function getHmacHash(secretKey, hashString) {
    return crypto.HmacSHA256(hashString, secretKey).toString().toUpperCase();
}
/**
 * Determines if an incoming page request is authentic.
 * @param querystring The collection of querystring parameters from the request.
 * @param shopifySecretKey Your app's secret key.
 * @returns a boolean indicating whether the request is authentic or not.
 */
function isAuthenticRequest(querystring, shopifySecretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const hmac = querystring["hmac"];
        if (!hmac) {
            return false;
        }
        const computed = getHmacHash(shopifySecretKey, buildHashString("web", querystring));
        return computed === hmac.toUpperCase();
    });
}
exports.isAuthenticRequest = isAuthenticRequest;
/**
 * Determines if an incoming proxy page request is authentic.
 * @param querystring The collection of querystring parameters from the request.
 * @param shopifySecretKey Your app's secret key.
 * @returns a boolean indicating whether the request is authentic or not.
 */
function isAuthenticProxyRequest(querystring, shopifySecretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const signature = querystring["signature"];
        if (!signature) {
            return false;
        }
        const computed = getHmacHash(shopifySecretKey, buildHashString("proxy", querystring));
        return computed === signature.toUpperCase();
    });
}
exports.isAuthenticProxyRequest = isAuthenticProxyRequest;
/**
 * Determines if an incoming webhook requeset is authentic.
 * @param headers Either an object containing the request's headers, or the X-Shopify-Hmac-SHA256 header string itself.
 * @param requestBody The entire request body as a string.
 * @param shopifySecretKey Your app's secret key.
 * @returns a boolean indicating whether the request is authentic or not.
 */
function isAuthenticWebhook(headers, requestBody, shopifySecretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        let hmac;
        if (typeof headers === "string") {
            hmac = headers;
        }
        else {
            hmac = headers["X-Shopify-Hmac-SHA256"];
        }
        if (!hmac) {
            return false;
        }
        const computed = getHmacHash(shopifySecretKey, requestBody);
        return computed === hmac.toUpperCase();
    });
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
            headers: infrastructure_1.BaseService.buildDefaultHeaders(),
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
    return __awaiter(this, void 0, void 0, function* () {
        const url = new uri(shopifyDomain);
        url.protocol("https");
        url.path("admin/oauth/authorize");
        url.addQueryParam("client_id", shopifyApiKey);
        url.addQueryParam("scope", scopes.join(","));
        if (redirectUrl) {
            url.addQueryParam("redirect_uri", redirectUrl);
        }
        if (state) {
            url.addQueryParam("state", state);
        }
        return url.toString();
    });
}
exports.buildAuthorizationUrl = buildAuthorizationUrl;
/**
 * Finalizes app installation, generating a permanent access token for the user's store.
 * @param code The authorization code generated by Shopify, which should be a parameter named 'code' on the request querystring.
 * @param shopifyDomain The store's Shopify domain, which should be a parameter named 'shop' on the request querystring.
 * @param shopifyApiKey Your app's public API key.
 * @param shopifySecretKey Your app's secret key.
 * @returns The access token.
 */
function authorize(code, shopDomain, shopifyApiKey, shopifySecretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield new AuthorizeService(shopDomain).authorize(shopifyApiKey, shopifySecretKey, code);
        return response;
    });
}
exports.authorize = authorize;
/**
 * A private, unexported service for authorizing app installation.
 */
class AuthorizeService extends infrastructure_1.BaseService {
    constructor(shopDomain) {
        super(shopDomain, undefined, "oauth");
    }
    authorize(shopifyApiKey, shopifySecretKey, code) {
        return this.createRequest("POST", "access_token", "access_token", {
            client_id: shopifyApiKey,
            client_secret: shopifySecretKey,
            code: code,
        });
    }
}
