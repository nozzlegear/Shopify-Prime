import { ShopifyObject } from "./base";

/**
 * Represents a Shopify shop.
 */
export interface Shop extends ShopifyObject {
    /**
     * The shop's street address. 
     */
    address1?: string;

    /**
     * The second line of the shop's street address.
     */
    address2?: string;

    /**
     * The city in which the shop is located.
     */
    city?: string;

    /**
     * The shop's country (by default equal to the two-letter country code).
     */
    country?: string;

    /**
     * The two-letter country code corresponding to the shop's country.
     */
    country_code?: string;

    /**
     * The shop's normalized country name.
     */
    country_name?: string;

    /**
     * The date and time when the shop was created.
     */
    created_at?: string;

    /**
     * The customer's email.
     */
    customer_email?: string;

    /**
     * The three-letter code for the currency that the shop accepts. 
     */
    currency?: string;

    /**
     * The shop's description.
     */
    description?: string;

    /**
     * The shop's domain.
     */
    domain?: string;

    /**
     * The contact email address for the shop.
     */
    email?: string;

    /**
     * Indicates whether the shop forces requests made to its resources to be made over SSL, using the HTTPS protocol. If true, HTTP requests will be redirected to HTTPS.
     */
    force_ssl?: boolean;

    /**
     * Present when a shop has a google app domain. It will be returned as a URL, else null. 
     */
    google_apps_domain?: string;

    /**
     * Present if a shop has google apps enabled. Those shops with this feature will be able to login to the google apps login.
     */
    google_apps_login_enabled?: boolean;

    /**
     * Geographic coordinate specifying the north/south location of a shop.
     */
    latitude?: string;

    /**
     * Geographic coordinate specifying the east/west location of a shop.
     */
    longitude?: string;

    /**
     * A string representing the way currency is formatted when the currency isn't specified.
     */
    money_format?: string;

    /**
     * A string representing the way currency is formatted when the currency is specified.
     */
    money_with_currency_format?: string;

    /**
     * The shop's 'myshopify.com' domain.
     */
    myshopify_domain?: string;

    /**
     * The name of the shop.
     */
    name?: string;

    /**
     * The name of the Shopify plan the shop is on.
     */
    plan_name?: string;

    /**
     * The display name of the Shopify plan the shop is on.
     */
    display_plan_name?: string;

    /**
     * Indicates whether the Storefront password protection is enabled.
     */
    password_enabled?: boolean;

    /**
     * The contact phone number for the shop.
     */
    phone?: string;

    /**
     * The shop's primary locale.
     */
    primary_locale?: string;

    /**
     * The shop's normalized province or state name.
     */
    province?: string;

    /**
     * The two-letter code for the shop's province or state.
     */
    province_code?: string;

    /**
     * A list of countries the shop ships products to, separated by a comma.
     */
    ships_to_countries?: string;

    /**
     * The username of the shop owner.
     */
    shop_owner?: string;

    /**
     * Unkown. Shopify documentation does not currently indicate what this property actually is.
     */
    source?: string;

    /**
     * Specifies whether or not taxes were charged for shipping. Although the Shopify docs don't indicate this, it's possible for the value to be null.
     */
    tax_shipping?: boolean;

    /**
     * The setting for whether applicable taxes are included in product prices. 
     */
    taxes_included?: boolean;

    /**
     * The setting for whether the shop is applying taxes on a per-county basis or not (US-only). Valid values are: "true" or "null."
     */
    county_taxes?: boolean;

    /**
     * The name of the timezone the shop is in.
     */
    timezone?: string;

    /**
     * The named timezone assigned by the IANA.
     */
    iana_timezone?: string;

    /**
     * The zip or postal code of the shop's address.
     */
    zip?: string;

    /**
     * Indicates whether the shop has web-based storefront or not.
     */
    has_storefront?: boolean;

    /**
     * Indicates whether the shop has any outstanding setup steps or not.
     */
    setup_required?: boolean;

    /**
     * Indicates whether the shop supports the Discounts api 
     */
    has_discounts?: boolean

    /**
     * Indicates whether the shop supports the Gift Cards api 
     */
    has_gift_cards?: boolean
}
