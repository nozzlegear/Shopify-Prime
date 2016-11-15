import { Shop } from "../typings/models/shop";
import BaseService from "../infrastructure/base_service";
import { FieldOptions, ListOptions } from "../typings/options/base";

/**
 * A service for manipulating Shopify shops.
 */
export default class Shops extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "");
    }

    /**
     * Returns shop data for the shop.
     * @param options Options for filtering the result.
     */
    public get(options?: FieldOptions) {
        return this.createRequest<Shop>("GET", "shop.json", "shop", options);
    }

    /**
     * Forces the shop to uninstall your Shopify app. Uninstalling an application is an irreversible operation. Be entirely sure that you no longer need to make API calls for the shop in which the application has been installed.
     */
    public forceUninstallApp() {
        return this.createRequest<void>("DELETE", "api_permissions/current.json");
    }
}