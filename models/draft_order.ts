import { ShopifyObject } from "./base";
import { Customer } from "./customer";
import { Address } from "./address";
import { ShippingLine } from "./shipping_line";
import { TaxLine } from "./tax_line";
import { NoteAttribute } from "./note_attribute";
import { DraftLineItem } from "./draft_line_item";
import { AppliedDiscount } from "./applied_discount";
import { MetaField } from "./meta_field";

export interface DraftOrder extends ShopifyObject {
    /**
     * The unique numeric identifier for the order associated to the draft order, once created.
     */
    order_id?: number;

    /**
     * Name of the draft order.
     */
    name: string;

    /**
     * Customer associated with the draft order. Customer associated with the draft order. Used to load/remove the associated customer with customer id. When a customer is loaded, the customerΓÇÖs email address is also assocaited.
     */
    customer: Customer;

    /**
     * The mailing address to where the order will be shipped. This address is optional and will not be available on orders that do not require one.
     */
    shipping_address: Address;

    /**
     * The mailing address associated with the payment method. This address is an optional field that will not be available on orders that do not require one.
     */
    billing_address: Address;

    /**
     * The text of an optional note that a shop owner can attach to the draft order.
     */
    note: string;

    /**
     * Extra information that is added to the order.
     */
    note_attributes: NoteAttribute[];

    /**
     * The customer's email address.
     */
    email: string;

    /**
     * The three letter code (ISO 4217) for the currency used for the payment.
     */
    currency: string;

    /**
     * This auto-generated property is the date and time when the invoice was emailed to the customer, in ISO 8601 format.
     */
    invoice_sent_at?: string;

    /**
     * The URL for the invoice.
     */
    invoice_url: string;

    /**
     * Product variant line item or custom line item associated to the draft order. Each draft order must include at least one line_item.
     */
    line_items: DraftLineItem[];

    /**
     * Details the shipping method used.
     */
    shipping_line: ShippingLine;

    /**
     * Tags are additional short descriptors, commonly used for filtering and searching, formatted as a string of comma-separated values.
     */
    tags: string;

    /**
     * Sets whether or not taxes are exempt for the draft order. If this field is set to false, then Shopify will refer to the taxable field for each line_item. If a customer is applied to the draft order, then Shopify will use the customer's tax_exempt field instead.
     */
    tax_exempt?: boolean;

    /**
     * An array of tax_line objects, each of which details the total taxes applicable to the order. When creating an order through the API, tax lines may be specified on the order or the line items but not both. Tax lines specified on the order are split on the taxable line items in the created order.
     */
    tax_lines: TaxLine[];

    /**
     * Discount which will be applied to the line item or the overall order. A draft order line_item can have one discount. A draft order can have one order-level discount.
     */
    applied_discount: AppliedDiscount;

    /**
     * States whether or not taxes are included in the order subtotal.
     */
    taxes_included?: boolean;

    /**
     * The sum of all the taxes applied to the order (must be positive).
     */
    total_tax?: number;

    /**
     * Price of the order before shipping and taxes
     */
    subtotal_price?: number;

    /**
     * The sum of all the prices of all the items in the order, taxes and discounts included (must be positive).
     */
    total_price?: number;

    /**
     * Date at which order is created and the draft order changes to completed status. The API returns this value in ISO 8601 format.
     */
    completed_at?: string;

    /**
     * This auto-generated property is the date and time when the draft order was created in Shopify, in ISO 8601 format.
     */
    created_at?: string;

    /**
     * The date and time when the order was last modified. The API returns this value in ISO 8601 format.
     */
    updated_at?: string;

    /// Once a draft order is set to status completed the only further draft order modifications that can be made are adding tags or metafields. No other draft order actions are permitted.
    /**
     * Known values are "open", "invoice_sent", and "completed".
     */
    status: string;

    /// Additional metadata about the <see cref="DraftOrder"/>. Note: This is not naturally returned with a <see cref="DraftOrder"/> response, as
    /// Shopify will not return <see cref="DraftOrder"/> metafields unless specified. Instead, you need to query metafields with <see cref="MetaFieldService"/>.
    /**
     * Uses include: Creating, updating, & deserializing webhook bodies that include them.
     */
    metafields: MetaField[];
}
