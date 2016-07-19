/// <reference path="./../typings/index.d.ts" />
"use strict";
const infrastructure_1 = require("../infrastructure");
/**
 * A service for manipulating Shopify script tags.
 */
class ScriptTags extends infrastructure_1.BaseService {
    constructor(shopDomain, accessToken) {
        super(shopDomain, accessToken, "script_tags");
    }
    /**
     * Gets a count of all of the shop's script tags.
     * @param options Options for filtering the results.
     */
    count(options) {
        return this.createRequest("GET", "count.json", "count", options);
    }
    /**
     * Gets a list of up to 250 of the shop's script tags.
     * @param options Options for filtering the results.
     */
    list(options) {
        return this.createRequest("GET", ".json", "script_tags", options);
    }
    /**
     * Retrieves the script tag with the given id.
     * @param options Options for filtering the results.
     */
    get(id, options) {
        return this.createRequest("GET", `${id}.json`, "script_tag", options);
    }
    /**
     * Creates a new script tag.
     */
    create(tag) {
        return this.createRequest("POST", ".json", "script_tag", { script_tag: tag });
    }
    /**
     * Updates the script tag with the given id.
     * @param tag The updated script tag.
     */
    update(id, tag) {
        return this.createRequest("PUT", `${id}.json`, "script_tag", { script_tag: tag });
    }
    /**
     * Deletes the script tag with the given id.
     */
    delete(id) {
        return this.createRequest("DELETE", `${id}.json`);
    }
}
exports.ScriptTags = ScriptTags;
