import { ShopifyObject } from "./base";
import { LineItem } from "./line_item";

export interface Fulfillment extends ShopifyObject {
    /** 
     * The date and time when the fulfillment was created. 
     */
    created_at?: string;

    /** 
     * A historical record of each item in the fulfillment.
     */
    line_items?: LineItem[];

    /** 
     * The unique numeric identifier for the order.
     */
    order_id?: number;

    /** 
     * A textfield with information about the receipt.
     */
    receipt?: any;

    /** 
     * The status of the fulfillment. Known values are 'pending', 'open', 'success', 'cancelled', 
     * 'error' and 'failure'.
     */
    status?: string;

    /** 
     * The name of the shipping company.
     */
    tracking_company?: string;

    /** 
     * The shipping number, provided by the shipping company. If multiple tracking numbers
     * exist, returns the first number.
     */
    tracking_number?: string;

    /** 
     * A list of shipping numbers, provided by the shipping company. May be null.
     */
    tracking_numbers?: string[];

    /** 
     * The tracking url, provided by the shipping company. May be null. If multiple tracking URLs
     * exist, returns the first URL.
     */
    tracking_url?: string;

    /** 
     * An array of one or more tracking urls, provided by the shipping company. May be null.
     */
    tracking_urls?: string[];

    /** 
     * The date and time when the fulfillment was last modified.
     */
    updated_at?: string;
}