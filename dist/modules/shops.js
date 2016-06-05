/// <reference path="./../typings/index.d.ts" />
"use strict";
const base_service_1 = require("./base_service");
/**
 * A service for manipulating Shopify shops.
 */
class Shops extends base_service_1.BaseService {
    constructor(shopDomain, accessToken) {
        super(shopDomain, accessToken, "");
    }
    /**
     * Returns shop data for the shop.
     */
    get() {
        return this.createRequest("GET", "shop.json", "shop");
    }
    /**
     * Forces the shop to uninstall your Shopify app. Uninstalling an application is an irreversible operation. Be entirely sure that you no longer need to make API calls for the shop in which the application has been installed.
     */
    forceUninstallApp() {
        return this.createRequest("DELETE", "api_permissions/current.json");
    }
}
exports.Shops = Shops;
