import { TaxLine } from "./tax_line";
import { ShopifyObject } from "./base";
import { LineItemProperty } from "./line_item_property";

export interface LineItem extends ShopifyObject {
    /// <summary>
    /// The amount available to fulfill. This is the quantity - max(refunded_quantity, fulfilled_quantity) - pending_fulfilled_quantity.
    /// </summary>
    fulfillable_quantity?: number;

    /// <summary>
    /// Service provider who is doing the fulfillment. Valid values are either "manual" or the name of the provider. eg: "amazon", "shipwire", etc.
    /// </summary>
    fulfillment_service?: string;

    /// <summary>
    /// The fulfillment status of this line item. Known values are 'fulfilled', 'null' and 'partial'.
    /// </summary>
    fulfillment_status?: string;

    /// <summary>
    /// The weight of the item in grams.
    /// </summary>
    grams?: number;

    /// <summary>
    /// The price of the item before discounts have been applied.
    /// </summary>
    /// <remarks>Shopify returns this value as a string.</remarks>
    price?: number;

    /// <summary>
    /// The unique numeric identifier for the product in the fulfillment. Can be null if the original product associated with the order is deleted at a later date
    /// </summary>
    product_id?: number;

    /// <summary>
    /// The number of products that were purchased.
    /// </summary>
    quantity?: number;

    /// <summary>
    /// States whether or not the fulfillment requires shipping.
    /// </summary>
    requires_shipping?: boolean;

    /// <summary>
    /// A unique identifier of the item in the fulfillment.
    /// </summary>
    sku?: string;

    /// <summary>
    /// The title of the product.
    /// </summary>
    title?: string;

    /// <summary>
    /// The id of the product variant. Can be null if the product purchased is not a variant.
    /// </summary>
    variant_id?: number;

    /// <summary>
    /// The title of the product variant. Can be null if the product purchased is not a variant.
    /// </summary>
    variant_title?: string;

    /// <summary>
    /// The name of the product variant.
    /// </summary>
    name?: string;

    /// <summary>
    /// The name of the supplier of the item.
    /// </summary>
    vendor?: string;

    /// <summary>
    /// States whether the order used a gift card.
    /// </summary>
    gift_card?: boolean;

    /// <summary>
    /// States whether or not the product was taxable.
    /// </summary>
    taxable?: boolean;

    /// <summary>
    /// An array of <see cref="ShopifyTaxLine"/> objects, each of which details the taxes applicable to this <see cref="ShopifyLineItem"/>.
    /// </summary>
    tax_lines?: TaxLine[];

    /// <summary>
    /// The total discount amount applied to this line item. This value is not subtracted in the line item price.
    /// </summary>
    total_discount?: number;

    /// <summary>
    /// An array of custom information for an item that has been added to the cart.
    /// Often used to provide product customization options.
    /// An array of <see cref="ShopifyTaxLine"/> objects, each of which details the taxes applicable to this <see cref="ShopifyLineItem"/>.
    /// </summary>
    properties?: LineItemProperty[];
}