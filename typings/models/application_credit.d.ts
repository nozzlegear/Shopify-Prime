import { ShopifyObject } from "./base";

/**
 * An object representing Shopify's ApplicationCredit object, which can be used to offer credits for payments made via the Application Charge, Recurring Application Charge, and Usage Charge APIs.
 */
export interface ApplicationCredit extends ShopifyObject {
    /**
     * The description of the application credit.
     */
    description?: string;

    /**
     * The amount refunded by the application credit.
     */
    amount?: number;

    /**
     * States whether or not the application credit is a test transaction. Valid values are true or null.
     */
    test?: boolean;
}