import {FieldOptions} from "./field_options";

export interface ListOptions extends FieldOptions
{
    /**
     * Retrieve only objects that were created after the given date and time (format: 2014-04-25T16:15:47-04:00).
     */
    created_at_min?: string;
    
    /**
     * Retrieve only objects that were created before the given date and time (format: 2014-04-25T16:15:47-04:00).
     */
    created_at_max?: string;
    
    /**
     * The maximum number of objects that should be returned, up to 250. Setting this parameter above 250 will result in an error.
     */
    limit?: number;
    
    /**
     * The page number of the result list to retrieve. Use this in tandem with limit to page through the webhooks in a shop.
     */
    page?: number;
    
    /**
     * Restricts results to those created after the given id.
     */
    since_id?: number;
    
    /**
     * Retrieve only objects that were created after the given date and time (format: 2014-04-25T16:15:47-04:00).
     */
    updated_at_min?: string;
    
    /**
     * Retrieve only objects that were created before the given date and time (format: 2014-04-25T16:15:47-04:00).
     */
    updated_at_max?: string;
}