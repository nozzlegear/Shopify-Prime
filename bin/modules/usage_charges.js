/// <reference path="./../typings/index.d.ts" />
"use strict";
const infrastructure_1 = require("../infrastructure");
/**
 * A service for manipulating Shopify's UsageCharges API.
 */
class UsageCharges extends infrastructure_1.BaseService {
    constructor(shopDomain, accessToken) {
        super(shopDomain, accessToken, "recurring_application_charges");
    }
    /**
     * Creates a new charge.
     * @param recurringChargeId The id of the recurring charge that this usage charge belongs to.
     */
    create(recurringChargeId, charge) {
        return this.createRequest("POST", `${recurringChargeId}/usage_charges.json`, "usage_charge", { usage_charge: charge });
    }
    /**
     * Gets a charge with the given id.
     * @param recurringChargeId The id of the recurring charge that this usage charge belongs to.
     * @param id The id of the charge to get.
     * @param options Options for filtering the result.
     */
    get(recurringChargeId, id, options) {
        return this.createRequest("GET", `${recurringChargeId}/usage_charges/${id}.json`, "usage_charge", options);
    }
    /**
     * Retrieves a list of all charges.
     * @param recurringChargeId The id of the recurring charge that this usage charge belongs to.
     * @param options Options for filtering the result.
     */
    list(recurringChargeId, options) {
        return this.createRequest("GET", `${recurringChargeId}/usage_charges.json`, "usage_charges", options);
    }
}
exports.UsageCharges = UsageCharges;
