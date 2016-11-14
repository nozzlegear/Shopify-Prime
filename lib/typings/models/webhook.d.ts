import { ShopifyObject } from "./base";
import { WebhookTopic } from "../enums/webhook_topic";

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