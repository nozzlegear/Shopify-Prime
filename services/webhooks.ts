import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Webhook } from '../models';

/**
 * A service for manipulating Shopify webhooks.
 */
export class Webhooks extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "webhooks");
    }

    /**
     * Gets a count of all of the shop's webhooks.
     * @param options Options for filtering the results.
     */
    public count(options?: Options.WebhookOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a list of up to 250 of the shop's webhooks.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.WebhookOptions & Options.ListOptions & Options.DateOptions & Options.FieldOptions) {
        return this.createRequest<Webhook[]>("GET", ".json", "webhooks", options);
    }

    /**
     * Retrieves the webhook with the given id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<Webhook>("GET", `${id}.json`, "webhook", options);
    }

    /**
     * Creates a new webhook.
     */
    public create(webhook: Webhook) {
        return this.createRequest<Webhook>("POST", ".json", "webhook", { webhook });
    }

    /**
     * Updates the webhook with the given id.
     * @param webhook The updated webhook.
     */
    public update(id: number, webhook: Webhook) {
        return this.createRequest<Webhook>("PUT", `${id}.json`, "webhook", { webhook });
    }

    /**
     * Deletes the webhook with the given id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}

export default Webhooks;