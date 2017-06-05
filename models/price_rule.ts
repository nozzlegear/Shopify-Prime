import { ShopifyObject } from "./base";

/**
 * Represents a Shopify redirect.
 */
export interface PriceRule extends ShopifyObject {

    /** 
     * The title of the price rule.
     */
    title: string

    /** 
     * The target type the price rule applies to.
     */
    target_type: "line_item" | "shipping_line"

    /** 
     * The target selection method of the price rule. Use all to apply the discount to all line items
     * in the checkout and use entitled to apply to selected entitlements.
     */
    target_selection: "all" | "entitled"

    /** 
     * The allocation method of the price rule.
     * With an allocation method of each, the discount will be applied to each of the entitled items. For example, for a price rule that take $15 off, each entitled line item in a checkout will be discounted by $15.
     * With an allocation method of across, the calculated discount amount will be applied across the entitled items.For example, for a price rule that takes $15 off, the discount will be applied across all the entitled items.
     * Currently, if target_type is shipping_line, then only each is accepted.
     */
    allocation_method: "across" | "each"

    /** 
     * The value type of the price rule. If target_type is shipping_line then only percentage is accepted.
     */
    value_type: "fixed_amount" | "percentage"

    /** 
     * The value of the price rule. If target_type is shipping_line, then only -100 is accepted.
     * It's important to note that when discounting a resource, the value must be a negative number.
     */
    value: string

    /** 
     * The price rule can only be used once per customer (tracked by customer id).
     */
    once_per_customer: boolean

    /** 
     * The maximum number of times the price rule can be used, per discount code.
     */
    usage_limit?: number

    /** 
     * The customer selection for the price rule.A customer selection of all means there are no restrictions 
     * on who's eligible for the price rule.
     */
    customer_selection: "all" | "prerequisite"

    /** 
     * Prerequisite cart subtotal range.
     */
    prerequisite_subtotal_range?: {
        greater_than_or_equal_to: number
    },

    /** 
     * Prerequisite shipping cost range.Can only be used when target_type is shipping_line.
     */
    prerequisite_shipping_price_range?: {
        less_than_or_equal_to: number
    },

    /** 
     * A list of prerequisite customer saved search ids. For the price rule to be applicable, 
     * the customer applying the price rule must be in the group of customers matching the customer saved searches.
     */
    prerequisite_saved_search_ids?: number[]

    /** 
     * A list of entitled product ids.Can be used in combination with entitled_variant_ids. entitled_product_ids can 
     * only be used in conjunction with target_type set to line_itemif and target_selection set to entitled
     */
    entitled_product_ids?: number[]

    /** 
     * A list of entitled product variant ids. Can be used in combination with entitled_product_ids. 
     * entitled_variant_ids can only be used in conjunction with target_type set to line_item if and target_selection set to
     * entitled
     */
    entitled_variant_ids?: number[]

    /** 
     * A list of entitled collection ids. Cannot be used in combination with entitled_product_ids nor 
     * entitled_variant_ids. entitled_collection_ids can only be used in conjunction with target_typeset to line_item and 
     * target_selection set to entitled
     */
    entitled_collection_ids?: number[]

    /** 
     * A list of shipping country ids. entitled_country_ids can only be used in conjunction with target_type set to 
     * shipping_line and target_selection set to entitled.
     */
    entitled_country_ids?: number[]

    /** 
     * The date and time when the price rule starts.
     */
    starts_at: string

    /** 
     * The date and time when the price rule ends.Must be after starts_at.
     */
    ends_at?: string

    /** 
     * The id of the price rule
     */
    id?: number

    /** 
     * By default, this auto- generated property is the date and time when the price rule was created in Shopify, in ISO 8601 format.
     */
    created_at?: string

    /** 
     * The date and time when the price rule was last updated.
     */
    updated_at?: string
}