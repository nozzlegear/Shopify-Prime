/// <reference path="../typings/index.d.ts" />
export declare function isAuthenticRequest(): void;
export declare function isAuthenticProxyRequest(): void;
export declare function isAuthenticWebhook(): void;
export declare function isValidShopifyUrl(): void;
export declare function buildAuthorizationUrl(): void;
export declare function authorize(): void;
export { BaseService } from "./modules/base-service";
export { ShopifyError } from "./modules/shopify-error";
