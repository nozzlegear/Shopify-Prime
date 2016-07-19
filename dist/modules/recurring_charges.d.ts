/// <reference path="../../typings/index.d.ts" />
import { Charge } from "./charges";
import { FieldOptions, ListOptions } from "../options";
import { BaseService } from "../infrastructure";
/**
 * A service for manipulating Shopify's RecurringCharge API.
 */
export declare class RecurringCharges extends BaseService {
    constructor(shopDomain: string, accessToken: string);
    /**
     * Creates a new charge.
     */
    create(charge: RecurringCharge): Promise<RecurringCharge>;
    /**
     * Gets a charge with the given id.
     * @param id The id of the charge to get.
     * @param options Options for filtering the result.
     */
    get(id: number, options?: FieldOptions): Promise<RecurringCharge>;
    /**
     * Retrieves a list of all past and present charges.
     * @param options Options for filtering the result.
     */
    list(options?: ListOptions): Promise<RecurringCharge[]>;
    /**
     * Activates a charge. Can only be activated if the charge's status is "accepted".
     * @param id The id of the charge to activate.
     */
    activate(id: number): Promise<void>;
    /**
     * Deletes a charge.
     * @param id The id of the charge to delete.
     */
    delete(id: number): Promise<void>;
}
/**
 * Represents a recurring (e.g. monthly subscription) application charge.
 */
export interface RecurringCharge extends Charge {
    /**
     * The date and time the customer activated the charge. Will be null if the charge has not been activated.
     */
    activated_on?: string;
    /**
     * The date and time the customer will be billed. Will be null if the charge has not been activated.
     */
    billing_on?: string;
    /**
     * The date and time the customer cancelled their recurring charge. Will be null if the charge has not been cancelled.
     */
    cancelled_on?: string;
    /**
     * The capped amount is the limit a customer can be charged for usage based billing.
     */
    capped_amount?: number;
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
