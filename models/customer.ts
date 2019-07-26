import { Address } from "./address";
import { ShopifyObject } from "./base";

export interface Customer extends ShopifyObject {
    /** 
     * Indicates whether the customer has consented to be sent marketing material via email.
     */
    accepts_marketing?: boolean;

    /** 
     * A list of addresses for the customer.
     */
    addresses?: Address[];

    /** 
     * The date and time when the customer was created. 
     */
    created_at?: string;

    /** 
     * The default address for the customer.
     */
    default_address?: Address;

    /** 
     * The email address of the customer.
     */
    email?: string;

    /** 
     * The customer's first name.
     */
    first_name?: string;

    /** 
     * The customer's identifier used with Multipass login
     */
    multipass_identifier?: string;

    /** 
     * The customer's last name.
     */
    last_name?: string;

    /** 
     * The id of the customer's last order.
     */
    last_order_id?: number;

    /** 
     * The name of the customer's last order. This is directly related to the Order's name field.
     */
    last_order_name?: string;

    /** 
     * A note about the customer.
     */
    note?: string;

    /** 
     * The number of orders associated with this customer.
     */
    orders_count?: number;

    /** 
     * The state of the customer in a shop. Known values are 'disabled', 'decline', 'invited' and 'enabled'.
     */
    state?: string;

    /** 
     * Tags are additional short descriptors formatted as a string of comma-separated values.
     */
    tags?: string;

    /** 
     * Indicates whether the customer should be charged taxes when placing orders. 
     */
    tax_exempt?: boolean;

    /** 
     * The total amount of money that the customer has spent at the shop. Note: the Shopify API may return this as a string value.
     */
    total_spent?: string | number;

    /** 
     * The date and time when the customer information was updated. 
     */
    updated_at?: string;

    /** 
     * States whether or not the email address has been verified.
     */
    verified_email?: boolean;
}

export interface CustomerInvite {

    to?: string;

    from?: string;

    bcc?: string[];

    subject?: string;

    custom_message?: string;
}