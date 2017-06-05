import { ShopifyObject } from "./base";

export interface Address extends ShopifyObject {
    /**
     * The mailing address.
     */
    address1?: string;

    /**
     * An additional field for the mailing address.
     */
    address2?: string;

    /**
     * The city.
     */
    city?: string;

    /**
     * The company.
     */
    company?: string;

    /**
     * The country.
     */
    country?: string;

    /**
     * The two-letter country code corresponding to the country.
     */
    country_code?: string;

    /**
     * The normalized country name.
     */
    country_name?: string;

    /**
     * Indicates whether this address is the default address.
     */
    default?: boolean;

    /**
     * The first name.
     */
    first_name?: string;

    /**
     * The last name.
     */
    last_name?: string;

    /**
     * The name.
     */
    name?: string;

    /**
     * The phone number.
     */
    phone?: string;

    /**
     * The province or state name
     */
    province?: string;

    /**
     * The two-letter province or state code.
     */
    province_code?: string;

    /**
     * The ZIP or postal code.
     */
    zip?: string;
}