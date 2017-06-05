import * as crypto from 'crypto-js';
import BaseService from '../infrastructure/base_service';
import fetch from 'node-fetch';
import { AuthGrant, AuthScope } from '../enums';
import uri = require("jsuri");

/**
 * Replaces special querystring characters when calculating an authenticity signature in @isAuthenticRequest and @isAuthenticProxyRequest.
 */
function replaceChars(s: string, isKey: boolean) {
    if (!s) {
        return "";
    }

    let output = s.replace(/%/ig, "%25").replace(/&/ig, "%26");

    if (isKey) {
        output = output.replace(/=/ig, "%3D");
    }

    return output;
}

function buildHashString(type: "web" | "proxy", querystring: { [index: string]: any }) {
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
 * Computes an hmac-sha256 hash from the given key and string.
 * @param secretKey The application's secret Shopify key.
 * @param hashString The string being hashed.
 * @param convertToBase64 Whether the resulting hash should be converted to base64 or left as hex. Should be true for validating webhook requests.
 */
function getHmacHash(secretKey: string, hashString: string, convertToBase64 = false) {
    let hash = crypto.HmacSHA256(hashString, secretKey); 

    if (convertToBase64) {
        hash = crypto.enc.Base64.stringify(hash);
    }

    return hash.toString().toUpperCase();
}

/**
 * Determines if an incoming page request is authentic.
 * @param querystring The collection of querystring parameters from the request.
 * @param shopifySecretKey Your app's secret key.
 * @returns a boolean indicating whether the request is authentic or not.
 */
export async function isAuthenticRequest(querystring: { [index: string]: any }, shopifySecretKey: string) {
    const hmac = querystring["hmac"] as string;

    if (!hmac) {
        return false;
    }

    const computed = getHmacHash(shopifySecretKey, buildHashString("web", querystring))

    return computed === hmac.toUpperCase();
}

/**
 * Determines if an incoming proxy page request is authentic.
 * @param querystring The collection of querystring parameters from the request.
 * @param shopifySecretKey Your app's secret key.
 * @returns a boolean indicating whether the request is authentic or not.
 */
export async function isAuthenticProxyRequest(querystring: { [index: string]: any }, shopifySecretKey: string) {
    const signature = querystring["signature"] as string;

    if (!signature) {
        return false;
    }

    const computed = getHmacHash(shopifySecretKey, buildHashString("proxy", querystring))

    return computed === signature.toUpperCase();
}

/**
 * Determines if an incoming webhook requeset is authentic.
 * @param headers Either an object containing the request's headers, or the X-Shopify-Hmac-SHA256 header string itself.
 * @param requestBody The entire request body as a string.
 * @param shopifySecretKey Your app's secret key.
 * @returns a boolean indicating whether the request is authentic or not.
 */
export async function isAuthenticWebhook(headers: { [index: string]: any } | string, requestBody: string, shopifySecretKey: string) {
    let hmac: string;

    if (typeof headers === "string") {
        hmac = headers;
    }
    else {
        const headerName = "X-Shopify-Hmac-SHA256";
        hmac = headers[headerName] || headers[headerName.toLowerCase()];
    }

    if (!hmac) {
        return false;
    }

    const computed = getHmacHash(shopifySecretKey, requestBody, true);

    return computed === hmac.toUpperCase();
}

/**
 * A convenience function that tries to ensure that a given URL is a valid Shopify store by checking the response headers for X-ShopId. This is an undocumented feature, use at your own risk.
 */
export async function isValidShopifyDomain(shopifyDomain: string) {
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
 * @param grants An optional array of token grant types.
 */
export async function buildAuthorizationUrl(scopes: AuthScope[], shopifyDomain: string, shopifyApiKey: string, redirectUrl?: string, state?: string, grants?: AuthGrant[]) {
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

    if (grants && Array.isArray(grants)) {
        grants.forEach(grant => url.addQueryParam("grant_options[]", grant));
    } else if (grants && typeof(grants) === "string") {
        url.addQueryParam("grant_options[]", grants as string);
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
export async function authorize(code: string, shopDomain: string, shopifyApiKey: string, shopifySecretKey: string) {
    const response = await new AuthorizeService(shopDomain).authorize(shopifyApiKey, shopifySecretKey, code);

    return response;
}

/**
 * A private, unexported service for authorizing app installation.
 */
class AuthorizeService extends BaseService {
    constructor(shopDomain: string) {
        super(shopDomain, undefined, "oauth");
    }

    public authorize(shopifyApiKey: string, shopifySecretKey: string, code: string) {
        return this.createRequest<string>("POST", "access_token", "access_token", {
            client_id: shopifyApiKey,
            client_secret: shopifySecretKey,
            code: code,
        });
    }
}