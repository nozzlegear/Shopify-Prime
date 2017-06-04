import { ListOptions, PublishedOptions, FieldOptions } from "./base";

export interface ProductBaseOptions {

    /**
     * Filter by product vendor
     */
    vendor?: string;

    /**
     * Filter Redirects with given target
     */
    product_type?: string;

    /**
     * Filter by collection id
     */
    collection_id?: string;
}

export interface ProductCountOptions extends ProductBaseOptions, PublishedOptions {

    /**
     * Show products created after date (format: 2014-04-25T16:15:47-04:00)
     */
    created_at_min?: string;

    created_at_max?: string;

    /**
     * Show products last updated after date (format: 2014-04-25T16:15:47-04:00)
     */
    updated_at_min?: string;

    updated_at_max?: string;
}

export interface ProductListOptions extends ProductBaseOptions, ProductCountOptions, ListOptions, FieldOptions {

    /**
     * A comma-separated list of product ids
     */
    ids?: string;

    title?: string

    vendor?: string

    product_type?: string

    collection_id?: string
}
