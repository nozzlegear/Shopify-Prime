import { ShopifyObject } from "./base";

/**
 * Represents a Shopify redirect.
 */
export interface Redirect extends ShopifyObject {
    /**
     * The unique numeric identifier for the redirect.
     */
    id?: number;

    /**
     * The "before" path to be redirected. When the user this path, s/he will be redirected to the path specified by target.
     */
    path: string;

    /**
     * The "after" path or URL to be redirected to. When the user visits the path specified by path, s/he will be redirected to this path or URL. This property can be set to any path on the shop's site, or any URL, even one on a completely different domain.
     */
    target: string;
}