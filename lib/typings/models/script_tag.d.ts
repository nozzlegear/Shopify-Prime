import { ShopifyObject } from "./base";

/**
 * An entity representing a Shopify script tag.
 */
export interface ScriptTag extends ShopifyObject {
    /**
     * The date and time the script tag was created.
     */
    created_at?: string;

    /**
     * DOM event which triggers the loading of the script. Currently, 'onload' is the only accepted value.
     */
    event?: "onload";

    /**
     * Specifies the src of the script tag, i.e. which URL to load it from.
     */
    src: string;

    /**
     * The date and time the script tag was updated.
     */
    updated_at?: string;
}