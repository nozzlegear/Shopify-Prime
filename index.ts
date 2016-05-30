/// <reference path="./typings/index.d.ts" />

import uri = require("jsuri");
import * as crypto from "crypto"; 
import * as fetch from "node-fetch";
import {BaseService} from "./modules/base-service";

export type AuthScope = (
    "read_content"       | 
    "write_content"      |
    "read_themes"        |
    "write_themes"       |
    "read_products"      |
    "write_products"     |
    "read_customers"     |
    "write_customers"    |
    "read_orders"        |
    "write_orders"       |
    "read_script_tags"   |
    "write_script_tags"  |
    "read_fulfillments"  |
    "write_fulfillments" |
    "read_shipping"      |
    "write_shipping"
);

/**
 * Replaces special querystring characters when calculating an authenticity signature in @isAuthenticRequest and @isAuthenticProxyRequest.
 */
function replaceChars(s: string, isKey: boolean)
{
    if (!s)
    {
        return "";
    }
    
    let output = s.replace(/%/ig, "%25").replace(/&/ig, "%26");
    
    if (isKey)
    {
        output = output.replace(/=/ig, "%3D");
    }
    
    return output;
}

function buildHashString(type: "web" | "proxy", querystring: {[index: string]: any})
{
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

/**
 * Determines if an incoming page request is authentic.
 * @param querystring The collection of querystring parameters from the request.
 * @param shopifySecretKey Your app's secret key.
 * @returns a boolean indicating whether the request is authentic or not.
 */
export function isAuthenticRequest(querystring: {[index: string]: any}, shopifySecretKey: string)
{
    const hmac = querystring["hmac"] as string;
    
    if (!hmac)
    {
        return false;
    }
    
    const digest = crypto.createHmac("sha256", shopifySecretKey)
        .update(buildHashString("web", querystring))
        .digest("hex") as string;
        
    return digest.toUpperCase() === hmac.toUpperCase();
}

/**
 * Determines if an incoming proxy page request is authentic.
 * @param querystring The collection of querystring parameters from the request.
 * @param shopifySecretKey Your app's secret key.
 * @returns a boolean indicating whether the request is authentic or not.
 */
export function isAuthenticProxyRequest(querystring: {[index: string]: any}, shopifySecretKey: string)
{
    const signature = querystring["signature"] as string;
    
    if (!signature)
    {
        return false;
    }
    
    const digest = crypto.createHmac("sha256", shopifySecretKey)
        .update(buildHashString("proxy", querystring))
        .digest("hex") as string;
        
    return digest.toUpperCase() === signature.toUpperCase();
}

export function isAuthenticWebhook()
{
    throw new Error("Not Implemented");
}

/**
 * A convenience function that tries to ensure that a given URL is a valid Shopify store by checking the response headers for X-ShopId. This is an undocumented feature, use at your own risk.
 */
export async function isValidShopifyDomain(shopifyDomain: string)
{
    const url = new uri(shopifyDomain);
    url.protocol("https");
    url.path("/admin");
    
    const response = await fetch(url.toString(), {
        method: "HEAD",
        headers: BaseService.buildDefaultHeaders(),
    });
    
    return response.headers.has("X-ShopId");
}

/**
 * Builds an authorization URL for Shopify OAuth integration. Send your user to this URL where they'll be asked to accept installation of your Shopify app.
 * @param scopes An array of scope permissions that your app will need from the user.
 * @param shopifyDomain The user's Shopify URL.
 * @param shopifyApiKey Your app's API key. This is NOT your secret key.
 * @param redirectUrl An optional URL that the user will be sent to after integration. Override's the Shopify app's default redirect URL.
 * @param state An optional, random string value provided by your application which is unique for each authorization request. During the OAuth callback phase, your application should check that this value matches the one you provided to this method.
 */
export function buildAuthorizationUrl(scopes: AuthScope[], shopifyDomain: string, shopifyApiKey: string, redirectUrl?: string, state?: string)
{
    const url = new uri(shopifyDomain);
    url.protocol("https");
    url.path("admin/oauth/authorize");    
    url.addQueryParam("client_id", shopifyApiKey);
    url.addQueryParam("scope", scopes.join(","));
    
    if (redirectUrl)
    {
        url.addQueryParam("redirect_url", redirectUrl);
    }
    
    if (state)
    {
        url.addQueryParam("state", state);
    }
    
    return url.toString();
}

/**
 * Finalizes app installation, generating a permanent access token for the user's store.
 * @param code The authorization code generated by Shopify, which should be a parameter named 'code' on the request querystring.
 * @param shopifyDomain The store's Shopify domain, which should be a parameter named 'shop' on the request querystring.
 * @param shopifyApiKey Your app's public API key.
 * @param shopifySecretKey Your app's secret key.
 * @returns The access token.
 */
export async function authorize(code: string, shopDomain: string, shopifyApiKey: string, shopifySecretKey: string)
{
    const service = new BaseService(shopDomain, undefined, "admin/oauth");
    const response = await service.createRequest<string>("POST", "access_token", "access_token", {
        client_id: shopifyApiKey,
        client_secret: shopifySecretKey,
        code: code, 
    });
    
    return response;
}

export {BaseService};
export {ShopifyError} from "./modules/shopify-error";