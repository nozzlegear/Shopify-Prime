/// <reference path="./../typings/index.d.ts" />

import {WebhookTopic} from "../enums";
import {ShopifyObject, BaseService} from "../infrastructure";
import {FieldOptions, ListOptions, WebhookOptions} from "../options";

/**
 * A service for manipulating Shopify webhooks.
 */
export class Webhooks extends BaseService
{
    constructor(shopDomain: string, accessToken: string)
    {
        super(shopDomain, accessToken, "webhooks");
    }
    
    /**
     * Gets a count of all of the shop's webhooks.
     * @param options Options for filtering the results.
     */
    public count(options?: WebhookOptions)
    {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }
    
    /**
     * Gets a list of up to 250 of the shop's webhooks.
     * @param options Options for filtering the results.
     */
    public list(options?: WebhookOptions & ListOptions)
    {
        return this.createRequest<Webhook[]>("GET", ".json", "webhooks", options);
    }
    
    /**
     * Retrieves the webhook with the given id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: FieldOptions)
    {
        return this.createRequest<Webhook>("GET", `${id}.json`, "webhook", options);
    }
    
    /**
     * Creates a new webhook.
     */
    public create(webhook: Webhook)
    {
        return this.createRequest<Webhook>("POST", ".json", "webhook", { webhook: webhook});
    }
    
    /**
     * Updates the webhook with the given id.
     * @param webhook The updated webhook.
     */
    public update(id: number, webhook: Webhook)
    {
        return this.createRequest<Webhook>("PUT", `${id}.json`, "webhook", { webhook: webhook});
    }
    
    /**
     * Deletes the webhook with the given id.
     */
    public delete(id: number)
    {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}

/**
 * An entity representing a Shopify webhook.
 */
export interface Webhook extends ShopifyObject
{
    /**
     * The URL where the webhook should send the POST request when the event occurs.
     */
    address: string;
    
    /**
     * The date and time when the webhook was created.
     */
    created_at?: string;
    
    /**
     * An optional array of fields which should be included in webhooks.
     */
    fields?: string[];
    
    /**
     * The format in which the webhook should send the data. Valid values are json and xml.
     */
    format?: "json" | "xml";
    
    /**
     * An optional array of namespaces for metafields that should be included in webhooks.
     */
    metafield_namespaces?: string[];
    
    /**
     * The event that will trigger the webhook.
     */
    topic: WebhookTopic;
    
    /**
     * The date and time when the webhook was updated.
     */
    updated_at?: string;
}