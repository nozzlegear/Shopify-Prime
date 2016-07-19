/// <reference path="./../typings/index.d.ts" />
"use strict";
const infrastructure_1 = require("../infrastructure");
/**
 * A service for manipulating Shopify's RecurringCharge API.
 */
class RecurringCharges extends infrastructure_1.BaseService {
    constructor(shopDomain, accessToken) {
        super(shopDomain, accessToken, "recurring_application_charges");
    }
    /**
     * Creates a new charge.
     */
    create(charge) {
        return this.createRequest("POST", ".json", "recurring_application_charge", { recurring_application_charge: charge });
    }
    /**
     * Gets a charge with the given id.
     * @param id The id of the charge to get.
     * @param options Options for filtering the result.
     */
    get(id, options) {
        return this.createRequest("GET", `${id}.json`, "recurring_application_charge", options);
    }
    /**
     * Retrieves a list of all past and present charges.
     * @param options Options for filtering the result.
     */
    list(options) {
        return this.createRequest("GET", ".json", "recurring_application_charges", options);
    }
    /**
     * Activates a charge. Can only be activated if the charge's status is "accepted".
     * @param id The id of the charge to activate.
     */
    activate(id) {
        return this.createRequest("POST", `${id}/activate.json`);
    }
    /**
     * Deletes a charge.
     * @param id The id of the charge to delete.
     */
    delete(id) {
        return this.createRequest("DELETE", `${id}.json`);
    }
}
exports.RecurringCharges = RecurringCharges;
