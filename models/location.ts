import { ShopifyObject } from './base';

export interface Location extends ShopifyObject {
    /** 
     * The first line of the address.
     */ 
    address1?: string;

    /** 
     * The second line of the address.
     */ 
    address2?: string;

    /** 
     * The city the location is in.
     */ 
    city?: string;

    /** 
     * The country the location is in.
     */ 
    country?: string;

    /** 
     * The two-letter code (ISO 3166-1 alpha-2 format) corresponding to country the location is in.
     */ 
    country_code?: string;

    /** 
     * The date and time (ISO 8601 format) when the location was created.
     */ 
    created_at?: string;

    /** 
     * Whether this is a fulfillment service location. If true, then the location is a fulfillment service location.
     * If false, then the location was created by the merchant and isn't tied to a fulfillment service. 
     */ 
    legacy?: string;

    /** 
     * The name of the location.
     */ 
    name?: string;

    /** 
     * The phone number of the location. This value can contain special characters like - and +.
     */ 
    phone?: string;

    /** 
     * The province the location is in.
     */ 
    province?: string;

    /** 
     * The two-letter code corresponding to province or state the location is in.
     */ 
    province_code?: string;

    /** 
     * The date and time (ISO 8601 format) when the location was last updated.
     */ 
    updated_at?: string

    /** 
     * The zip or postal code.
     */ 
    zip?: string
}