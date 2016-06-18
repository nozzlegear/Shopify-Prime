import {WebhookTopic} from "../enums";

export interface WebhookOptions
{
    /**
     * Retrieve only webhooks that possess the URI where the webhook sends the POST request when the event occurs.
     */
    address?: string;
    
    /**
     * Retrieve only webhooks with a given topic.
     */
    topic?: WebhookTopic;
}