import { CustomCollection } from "../typings/models/product_collection";
import BaseService from "../infrastructure/base_service";

// Enums
import { FieldOptions, PublishedOptions, DateOptions } from "../typings/options/base";
import { CollectionListOptions } from "../typings/options/product_collection";

export default class CustomCollections extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "custom_collections");
    }

    /**
     * Get a count of all custom collections that contain a given product
     * @param options Options for filtering the results.
     * @see https://help.shopify.com/api/reference/customcollection#count
     */
    public count(options?: { title?: string, product_id?: number } & DateOptions & PublishedOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Get a list of all custom collections that contain a given product
     * @param options Options for filtering the results.
     */
    public list(options?: CollectionListOptions) {
        return this.createRequest<CustomCollection[]>("GET", ".json", "custom_collections", options);
    }

    /**
     * Get a single custom collection
     * @param id The collection's id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: FieldOptions) {
        return this.createRequest<CustomCollection>("GET", `${id}.json`, "custom_collection", options);
    }

    /**
     * Creates an collection.
     * @param collection The collection being created.
     * @param options Options for creating the collection.
     */
    public create(collection: CustomCollection) {
        return this.createRequest<CustomCollection>("POST", ".json", "custom_collection", { custom_collection: collection });
    }

    /**
     * Updates an collection with the given id.
     * @param id The collection's id.
     * @param collection The updated collection.
     */
    public update(id: number, collection: CustomCollection) {
        return this.createRequest<CustomCollection>("PUT", `${id}.json`, "custom_collection", { custom_collection: collection });
    }

    /**
     * Deletes an collection with the given id.
     * @param id The collection's id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}