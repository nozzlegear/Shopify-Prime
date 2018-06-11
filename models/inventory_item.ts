import { ShopifyObject } from "./base";

export interface InventoryItem extends ShopifyObject {
    /*
     * The date and time (ISO 8601 format) when the inventory item was created. 
     */
    created_at?: string;

    /*
     * The unique SKU (stock keeping unit) of the inventory item.
     */
    sku?: string;

    /*
     * Whether the inventory item is tracked. If true, then inventory quantity changes are tracked by Shopify
     */
    tracked?: boolean;

    /*
     * The date and time (ISO 8601 format) when the inventory item was last modified. 
     */
    updated_at?: number;
}