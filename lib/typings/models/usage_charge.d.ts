import { ShopifyObject } from "./base";

/**
 * Represents a usage charge, a variable monthly fee for an app or a service.
 */
export interface UsageCharge extends ShopifyObject {
    /**
     * The date and time when the usage charge was created. 
     */
    created_at?: string;

    /**
     * The name or description of the usage charge.
     */
    description?: string;

    /**
     * The price of the usage charge.
     */
    price?: number;

    /**
     * The recurring application charge the usage charge belongs to.
     */
    recurring_application_charge_id?: number;

    /**
     * The date and time when the usage charge was last updated.
     */
    updated_at?: string;
}