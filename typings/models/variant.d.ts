import { ShopifyObject } from "./base";

/**
 * A list of variant objects, each one representing a slightly different version of the product. 
 * For example, if a product comes in different sizes and colors, each size and color permutation 
 * (such as "small black", "medium black", "large blue"), would be a variant.
 * 
 * To reorder variants, update the product with the variants in the desired order. The position
 * attribute on the variant will be ignored.
 * 
 */
export interface Variant extends ShopifyObject {

    /**
     * The barcode, UPC or ISBN number for the product.
     */
    barcode: string;

    /**
     * The competitors price for the same item.
     */
    compare_at_price?: any;

    /**
     * The date and time when the product variant was created. The API returns this value in ISO 8601 format.
     */
    created_at: string;

    /**
     * Service who is doing the fulfillment. Valid values are: manual
     */
    fulfillment_service: string;

    /**
     * The weight of the product variant in grams.
     */
    grams: number;

    /**
     * The weight of the product variant in the unit system specified with weight_unit.
     */
    weight: number;

    /**
     * The unit system that the product variant's weight is measure in. The weight_unit can be either "g", "kg, "oz", or "lb".
     */
    weight_unit: string;

    /**
     * Specifies whether or not Shopify tracks the number of items in stock for this product variant.
     */
    inventory_management: string;

    /**
     * Specifies whether or not customers are allowed to place an order for a product variant when it's out of stock
     */
    inventory_policy: string;

    /**
     * The number of items in stock for this product variant.
     */
    inventory_quantity: number;

    /**
     * Custom properties that a shop owner can use to define product variants. Multiple options can exist. Options are represented as: option1, option2, option3 etc.
     */
    option1: string;

    /**
     * The order of the product variant in the list of product variants. 1 is the first position. To reorder variants, update the product with the variants in the desired order. The position attribute on the variant will be ignored.
     */
    position: number;

    /**
     * The price of the product variant.
     */
    price: number;

    /**
     * The unique numeric identifier for the product.
     */
    product_id: number;

    /**
     * Specifies whether or not a customer needs to provide a shipping address when placing an order for this product variant.
     */
    requires_shipping: boolean;

    /**
     * A unique identifier for the product in the shop.
     */
    sku: string;

    /**
     * Specifies whether or not a tax is charged when the product variant is sold.
     */
    taxable: boolean;

    /**
     * The title of the product variant.
     */
    title: string;

    /**
     * The date and time when the product variant was last modified. The API returns this value in ISO 8601 format.
     */
    updated_at: string;

}