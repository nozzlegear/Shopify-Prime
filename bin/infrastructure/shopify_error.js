/// <reference path="./../typings/index.d.ts" />
"use strict";
class ShopifyError extends Error {
    constructor(response, body) {
        super();
        this.body = body;
        this.errors = {};
        this.statusCode = response.status;
        this.statusText = response.statusText;
        this.message = `[Shopify Prime] ${this.statusCode} ${this.statusText}. `;
        // Errors can be any of the following: 
        // 1. { errors: "some error message"}
        // 2. { errors: { "order" : "some error message" } }
        // 3. { errors: { "order" : [ "some error message" ] } }
        let errors = body.errors;
        if (!errors) {
            return;
        }
        if (typeof errors === "string") {
            // errors is #1
            this.errors["generic"] = [errors];
        }
        else if (typeof errors === "object") {
            for (const property in errors) {
                const value = errors[property];
                this.errors[property] = Array.isArray(value) ? value : [value];
            }
        }
    }
    get isShopifyPrime() {
        return true;
    }
}
exports.ShopifyError = ShopifyError;
