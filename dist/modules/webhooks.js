/// <reference path="./../typings/index.d.ts" />
"use strict";
const infrastructure_1 = require("../infrastructure");
/**
 * A service for manipulating Shopify webhooks.
 */
class Webhooks extends infrastructure_1.BaseService {
    constructor(shopDomain, accessToken) {
        super(shopDomain, accessToken, "webhooks");
    }
    /**
     * Gets a count of all of the shop's webhooks.
     * @param options Options for filtering the results.
     */
    count(options) {
        return this.createRequest("GET", "count.json", "count", options);
    }
    /**
     * Gets a list of up to 250 of the shop's webhooks.
     * @param options Options for filtering the results.
     */
    list(options) {
        return this.createRequest("GET", ".json", "webhooks", options);
    }
    /**
     * Retrieves the webhook with the given id.
     * @param options Options for filtering the results.
     */
    get(id, options) {
        return this.createRequest("GET", `${id}.json`, "webhook", options);
    }
    /**
     * Creates a new webhook.
     */
    create(webhook) {
        return this.createRequest("POST", ".json", "webhook", { webhook: webhook });
    }
    /**
     * Updates the webhook with the given id.
     * @param webhook The updated webhook.
     */
    update(id, webhook) {
        return this.createRequest("PUT", `${id}.json`, "webhook", { webhook: webhook });
    }
    /**
     * Deletes the webhook with the given id.
     */
    delete(id) {
        return this.createRequest("DELETE", `${id}.json`);
    }
}
exports.Webhooks = Webhooks;
