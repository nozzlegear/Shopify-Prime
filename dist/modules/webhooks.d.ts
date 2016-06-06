/// <reference path="../../typings/index.d.ts" />
import { WebhookTopic } from "../enums";
import { ShopifyObject, BaseService } from "../infrastructure";
import { FieldOptions, ListOptions, WebhookOptions } from "../options";
/**
 * A service for manipulating Shopify webhooks.
 */
export declare class Webhooks extends BaseService {
    constructor(shopDomain: string, accessToken: string);
    /**
     * Gets a count of all of the shop's webhooks.
     * @param options Options for filtering the results.
     */
    count(options?: WebhookOptions): Promise<number>;
    /**
     * Gets a list of up to 250 of the shop's webhooks.
     * @param options Options for filtering the results.
     */
    list(options?: WebhookOptions & ListOptions): Promise<Webhook[]>;
    /**
     * Retrieves the webhook with the given id.
     * @param options Options for filtering the results.
     */
    get(id: number, options?: FieldOptions): Promise<Webhook>;
    /**
     * Creates a new webhook.
     */
    create(webhook: Webhook): Promise<Webhook>;
    /**
     * Updates the webhook with the given id.
     * @param webhook The updated webhook.
     */
    update(id: number, webhook: Webhook): Promise<Webhook>;
    /**
     * Deletes the webhook with the given id.
     */
    delete(id: number): Promise<void>;
}
/**
 * An entity representing a Shopify webhook.
 */
export interface Webhook extends ShopifyObject {
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
