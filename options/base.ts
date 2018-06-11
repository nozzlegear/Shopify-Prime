import { PublishedStatus } from "../enums/published_status";

export interface FieldOptions {
    /**
     * A comma-separated list of fields that will be returned instead of the whole object.
     */
    fields?: string;
}

export interface DateOptions {
    /**
     * Retrieve only objects that were created after the given date and time (format: 2014-04-25T16:15:47-04:00).
     */
    created_at_min?: string;

    /**
     * Retrieve only objects that were created before the given date and time (format: 2014-04-25T16:15:47-04:00).
     */
    created_at_max?: string;

    /**
     * Retrieve only objects that were created after the given date and time (format: 2014-04-25T16:15:47-04:00).
     */
    updated_at_min?: string;

    /**
     * Retrieve only objects that were created before the given date and time (format: 2014-04-25T16:15:47-04:00).
     */
    updated_at_max?: string;
}

export interface ProcessedOptions {
    /**
     * Show objects imported or processed after date (format: 2014-04-25T16:15:47-04:00).
     */
    processed_at_min?: string;

    /**
     * Show objects imported or processed before date (format: 2014-04-25T16:15:47-04:00).
     */
    processed_at_max?: string;
}

export interface BasicListOptions {
    /**
     * The maximum number of objects that should be returned, up to 250. Setting this parameter above 250 will result in an error.
     */
    limit?: number;

    /**
     * The page number of the result list to retrieve. Use this in tandem with limit to page through the webhooks in a shop.
     */
    page?: number;
}

export interface ListOptions extends BasicListOptions {
    /**
     * Restricts results to those created after the given id.
     */
    since_id?: number;
}

export interface PublishedOptions {
    /**
     * Filter results to those published after date (format: 2014-04-25T16:15:47-04:00)
     */
    published_at_min?: string;

    /**
     * Filter results to those published before date (format: 2014-04-25T16:15:47-04:00)
     */
    published_at_max?: string;

    /**
     * Filter results to those with the given publish status.
     */
    published_status?: PublishedStatus;
}