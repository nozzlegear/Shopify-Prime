import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { UsageCharge } from '../models';

/**
 * A service for manipulating Shopify's UsageCharges API.
 */
export class UsageCharges extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "recurring_application_charges");
    }

    /**
     * Creates a new charge.
     * @param recurringChargeId The id of the recurring charge that this usage charge belongs to.
     */
    public create(recurringChargeId: number, charge: UsageCharge) {
        return this.createRequest<UsageCharge>("POST", `${recurringChargeId}/usage_charges.json`, "usage_charge", { usage_charge: charge });
    }

    /**
     * Gets a charge with the given id.
     * @param recurringChargeId The id of the recurring charge that this usage charge belongs to.
     * @param id The id of the charge to get.
     * @param options Options for filtering the result.
     */
    public get(recurringChargeId: number, id: number, options?: Options.FieldOptions) {
        return this.createRequest<UsageCharge>("GET", `${recurringChargeId}/usage_charges/${id}.json`, "usage_charge", options);
    }

    /**
     * Retrieves a list of all charges.
     * @param recurringChargeId The id of the recurring charge that this usage charge belongs to.
     * @param options Options for filtering the result.
     */
    public list(recurringChargeId: number, options?: Options.FieldOptions) {
        return this.createRequest<UsageCharge[]>("GET", `${recurringChargeId}/usage_charges.json`, "usage_charges", options);
    }
}

export default UsageCharges;