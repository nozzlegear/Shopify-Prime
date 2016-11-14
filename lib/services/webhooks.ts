import { Webhook } from "../typings/models/webhook";
import BaseService from "../infrastructure/base_service";

// Enums
import { WebhookOptions } from "../typings/options/webhooks";
import { FieldOptions, ListOptions, DateOptions } from "../typings/options/base";

/**
 * A service for manipulating Shopify webhooks.
 */
export default class Webhooks extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "webhooks");
    }

    /**
     * Gets a count of all of the shop's webhooks.
     * @param options Options for filtering the results.
     */
    public count(options?: WebhookOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a list of up to 250 of the shop's webhooks.
     * @param options Options for filtering the results.
     */
    public list(options?: WebhookOptions & ListOptions & DateOptions & FieldOptions) {
        return this.createRequest<Webhook[]>("GET", ".json", "webhooks", options);
    }

    /**
     * Retrieves the webhook with the given id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: FieldOptions) {
        return this.createRequest<Webhook>("GET", `${id}.json`, "webhook", options);
    }

    /**
     * Creates a new webhook.
     */
    public create(webhook: Webhook) {
        return this.createRequest<Webhook>("POST", ".json", "webhook", { webhook: webhook });
    }

    /**
     * Updates the webhook with the given id.
     * @param webhook The updated webhook.
     */
    public update(id: number, webhook: Webhook) {
        return this.createRequest<Webhook>("PUT", `${id}.json`, "webhook", { webhook: webhook });
    }

    /**
     * Deletes the webhook with the given id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}
