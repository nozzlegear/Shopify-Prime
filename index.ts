/// <reference path="./typings/index.d.ts" />

import uri = require("jsuri");
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

export function isAuthenticRequest()
{
    throw new Error("Not Implemented");
}

export function isAuthenticProxyRequest()
{
    throw new Error("Not Implemented");
}

export function isAuthenticWebhook()
{
    throw new Error("Not Implemented");
}

export function isValidShopifyUrl()
{
    throw new Error("Not Implemented");
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

export function authorize()
{
    throw new Error("Not Implemented");
}

export {BaseService};
export {ShopifyError} from "./modules/shopify-error";