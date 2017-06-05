import { ShopifyObject } from "./base";

/**
 * Represents a one-time application charge or a recurring subscription charge.
 */
export interface Charge extends ShopifyObject {
    /**
     * The URL that the customer should be sent to, to accept or decline the application charge.
     */
    confirmation_url?: string;

    /**
     * The date and time when the application charge was created.
     */
    created_at?: string;

    /**
     * The name of the application charge, e.g. "Super Expensive One-time Charge".
     */
    name: string;

    /**
     * The price of the application charge. Note: Shopify returns this value as a string.
     */
    price?: string | number;

    /**
     * The URL the customer is sent to once they accept/decline a charge.
     */
    return_url?: string;

    /**
     * The status of the charge.
     */
    status?: "pending" | "accepted" | "active" | "cancelled" | "declined" | "expired";

    /**
     * Whether or not the application charge is a test transaction.
     */
    test?: boolean;

    /**
     * The date and time when the recurring application charge was last updated.
     */
    updated_at?: string;
}