/// <reference path="./../typings/index.d.ts" />
"use strict";
const base_service_1 = require("./base_service");
/**
 * A service for manipulating Shopify's ApplicationCharge API.
 */
class Charges extends base_service_1.BaseService {
    constructor(shopDomain, accessToken) {
        super(shopDomain, accessToken, "application_charges");
    }
    /**
     * Creates a new charge.
     */
    create(charge) {
        return this.createRequest("POST", ".json", "application_charge", { application_charge: charge });
    }
    /**
     * Gets a charge with the given id.
     * @param id The id of the charge to get.
     * @param options Options for filtering the result.
     */
    get(id, options) {
        return this.createRequest("GET", `${id}.json`, "application_charge", options);
    }
    /**
     * Retrieves a list of all past and present charges.
     * @param options Options for filtering the result.
     */
    list(options) {
        return this.createRequest("GET", ".json", "application_charges", options);
    }
    /**
     * Activates a charge. Can only be activated if the charge's status is "accepted".
     * @param id The id of the charge to activate.
     */
    activate(id) {
        return this.createRequest("POST", `${id}/activate.json`);
    }
}
exports.Charges = Charges;
