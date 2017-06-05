import { Charge } from "./charge";

/**
 * Represents a recurring (e.g. monthly subscription) application charge.
 */
export interface RecurringCharge extends Charge {
    /**
     * The date and time the customer activated the charge. Will be null if the charge has not been activated.
     */
    activated_on?: string;

    /**
     * When using usage charges, this value indicates the total usage charges accrued during the current billing period.
     */
    balance_used?: number;

    /**
     * When using usage charges, this value indicates the remaining balance until the capped_amount is reached.
     */
    balance_remaining?: number;

    /**
     * The date and time the customer will be billed. Will be null if the charge has not been activated.
     */
    billing_on?: string;

    /**
     * The date and time the customer cancelled their recurring charge. Will be null if the charge has not been cancelled.
     */
    cancelled_on?: string;

    /**
     * The capped amount is the limit a customer can be charged for usage based billing. Note that Shopify returns this value as a string.
     */
    capped_amount?: number | string;

    /**
     * tates the terms and conditions of usage based billing charges. Must be present in order to create usage charges. These are presented to the merchant when they approve the usage charges for your app.
     */
    terms?: string;

    /**
     * Number of days the customer is eligible for a free trial.
     */
    trial_days: number;

    /**
     * The date and time the customer's free trial ends. Will be null if the charge has not been activated.
     */
    trial_ends_on?: string;
}