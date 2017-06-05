import { Address } from "./address";
import { TaxLine } from "./tax_line";
import { Customer } from "./customer";
import { ShopifyObject } from "./base";
import { LineItem } from "./line_item";
import { Fulfillment } from "./fulfillment";
import { Refund } from "./refund";
import { ShippingLine } from "./shipping_line";
import { DiscountCode } from "./discount_code";
import { ClientDetails } from "./client_details";
import { PaymentDetails } from "./payment_details";

// Enum imports
import { FinancialStatus } from "../enums/financial_status";
import { FulfillmentStatus } from "../enums/fulfillment_status";

export interface Order extends ShopifyObject {
    /// The mailing address associated with the payment method. This address is an optional field that will not be available on orders that do not require one. 
    billing_address?: Address;

    /// The IP address of the browser used by the customer when placing the order.
    browser_ip?: string;

    /// Indicates whether or not the person who placed the order would like to receive email updates from the shop. 
    /// This is set when checking the "I want to receive occasional emails about new products, promotions and other news" checkbox during checkout.    
    buyer_accepts_marketing?: boolean;

    /// The reason why the order was cancelled. If the order was not cancelled, this value is null. Known values are "customer", "fraud", "inventory" and "other".
    cancel_reason?: string;

    /// The date and time when the order was cancelled. If the order was not cancelled, this value is null.    
    cancelled_at?: string;

    /// Unique identifier for a particular cart that is attached to a particular order.    
    cart_token?: string;

    /// A <see cref="ShopifyClientDetails"/> object containing information about the client.
    client_details?: ClientDetails;

    /// The date and time when the order was closed. If the order was not clsoed, this value is null.
    closed_at?: string;

    /// The customer's contact email address.
    contact_email?: string;

    /// The date and time when the order was created in Shopify.    
    created_at?: string;

    /// The three letter code (ISO 4217) for the currency used for the payment.    
    currency?: string;

    /// A <see cref="ShopifyCustomer"/> object containing information about the customer. This value may be null if the order was created through Shopify POS.    
    customer?: Customer;

    /// Applicable discount codes that can be applied to the order.    
    discount_codes?: DiscountCode[];

    /// The order's email address. Note?: On and after 2015-11-03, you should be using <see cref="ContactEmail"/> to refer to the customer's email address. 
    /// Between 2015-11-03 and 2015-12-03, updates to an order's email will also update the customer's email. This is temporary so apps can be migrated over to 
    /// doing customer updates rather than order updates to change the contact email. After 2015-12-03, updating updating an order's email will no longer update 
    /// the customer's email and apps will have to use the customer update endpoint to do so.
    email?: string;

    /// The financial status of an order. Known values are "authorized", "paid", "pending", "partially_paid", "partially_refunded", "refunded" and "voided".    
    financial_status?: FinancialStatus;

    /// An array of <see cref="ShopifyFulfillment"/> objects for this order.
    fulfillments?: Fulfillment[];

    /// The fulfillment status for this order. Known values are 'fulfilled', 'partial' or null.
    fulfillment_status?: "fulfilled" | "partial" | string;

    refunds?: Refund[];

    /// Tags are additional short descriptors, commonly used for filtering and searching, formatted as a string of comma-separated values.    
    tags?: string;

    /// The URL for the page where the buyer landed when entering the shop.    
    landing_site?: string;

    /// An array of <see cref="ShopifyLineItem"/> objects, each one containing information about an item in the order.    
    line_items?: LineItem[];

    /// The customer's order name as represented by a number, e.g. '#1001'.
    name?: string;

    /// The text of an optional note that a shop owner can attach to the order.    
    note?: string;

    /// Extra information that is added to the order.    
    note_attributes?: {
        name?: string;
        value?: string;
    }

    /// Numerical identifier unique to the shop. A number is sequential and starts at 1000.    
    number?: number;

    /// A unique numeric identifier for the order. This one is used by the shop owner and customer. 
    /// This is different from the id property, which is also a unique numeric identifier for the order, but used for API purposes.
    order_number?: number;

    /// Payment details for this order. May be null if the order was created via API without payment details.
    payment_details?: PaymentDetails;

    /// The date that the order was processed at.
    processed_at?: string;

    /// The type of payment processing method. Known values are 'checkout', 'direct', 'manual', 'offsite', 'express', 'free' and 'none'.    
    processing_method?: string;

    /// The website that the customer clicked on to come to the shop.    
    referring_site?: string;

    /// The mailing address to where the order will be shipped. This address is optional and will not be available on orders that do not require one.    
    shipping_address?: Address;

    /// An array of <see cref="ShopifyShippingLine"/> objects, each of which details the shipping methods used.    
    shipping_lines?: ShippingLine[];

    /// Where the order originated. May only be set during creation, and is not writeable thereafter.
    /// Orders created via the API may be assigned any string of your choice except for "web", "pos", "iphone", and "android". 
    /// Default is "api".    
    source_name?: string;

    /// Price of the order before shipping and taxes    
    subtotal_price?: number;

    /// An array of <see cref="ShopifyTaxLine"/> objects, each of which details the total taxes applicable to the order.    
    tax_lines?: TaxLine[];

    /// States whether or not taxes are included in the order subtotal.     
    taxes_included?: boolean;

    /// Unique identifier for a particular order.    
    token?: string;

    /// The total amount of the discounts applied to the price of the order.
    total_discounts?: number;

    /// The sum of all the prices of all the items in the order.    
    total_line_items_price?: number;

    /// The sum of all the prices of all the items in the order, with taxes and discounts included (must be positive).    
    total_price?: number;

    /// The sum of all the prices of all the items in the order, in USD, with taxes and discounts included (must be positive).    
    total_price_usd?: number;

    /// The sum of all the taxes applied to the order (must be positive).    
    total_tax?: number;

    /// The sum of all the weights of the line items in the order, in grams.
    total_weight?: number;

    /// The date and time when the order was last modified.    
    updated_at?: string;
}