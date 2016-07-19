/// <reference path="./../typings/index.d.ts" />

import {FieldOptions} from "../options";
import {ShopifyObject, BaseService} from "../infrastructure";

/**
 * A service for manipulating Shopify's UsageCharges API.
 */
export class UsageCharges extends BaseService
{
    constructor(shopDomain: string, accessToken: string)
    {
        super(shopDomain, accessToken, "recurring_application_charges");
    }
    
    /**
     * Creates a new charge.
     * @param recurringChargeId The id of the recurring charge that this usage charge belongs to.
     */
    public create(recurringChargeId: number, charge: UsageCharge)
    {
        return this.createRequest<UsageCharge>("POST", `${recurringChargeId}/usage_charges.json`, "usage_charge", {usage_charge: charge});
    }
    
    /**
     * Gets a charge with the given id.
     * @param recurringChargeId The id of the recurring charge that this usage charge belongs to.
     * @param id The id of the charge to get.
     * @param options Options for filtering the result.
     */
    public get(recurringChargeId: number, id: number, options?: FieldOptions)
    {
        return this.createRequest<UsageCharge>("GET", `${recurringChargeId}/usage_charges/${id}.json`, "usage_charge", options);
    }
    
    /**
     * Retrieves a list of all charges.
     * @param recurringChargeId The id of the recurring charge that this usage charge belongs to.
     * @param options Options for filtering the result.
     */
    public list(recurringChargeId: number, options?: FieldOptions)
    {
        return this.createRequest<UsageCharge[]>("GET", `${recurringChargeId}/usage_charges.json`, "usage_charges", options);
    }
}

/**
 * Represents a usage charge, a variable monthly fee for an app or a service.
 */
export interface UsageCharge extends ShopifyObject
{
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