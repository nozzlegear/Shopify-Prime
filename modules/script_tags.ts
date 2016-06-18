/// <reference path="./../typings/index.d.ts" />

import {ShopifyObject, BaseService} from "../infrastructure";
import {FieldOptions, ListOptions, ScriptTagOptions} from "../options";

/**
 * A service for manipulating Shopify script tags.
 */
export class ScriptTags extends BaseService
{
    constructor(shopDomain: string, accessToken: string)
    {
        super(shopDomain, accessToken, "script_tags");
    }
    
    /**
     * Gets a count of all of the shop's script tags.
     * @param options Options for filtering the results.
     */
    public count(options?: ScriptTagOptions)
    {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }
    
    /**
     * Gets a list of up to 250 of the shop's script tags.
     * @param options Options for filtering the results.
     */
    public list(options?: ScriptTagOptions & ListOptions)
    {
        return this.createRequest<ScriptTag[]>("GET", ".json", "script_tags", options);
    }
    
    /**
     * Retrieves the script tag with the given id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: FieldOptions)
    {
        return this.createRequest<ScriptTag>("GET", `${id}.json`, "script_tag", options);
    }
    
    /**
     * Creates a new script tag.
     */
    public create(tag: ScriptTag)
    {
        return this.createRequest<ScriptTag>("POST", ".json", "script_tag", { script_tag: tag});
    }
    
    /**
     * Updates the script tag with the given id.
     * @param tag The updated script tag.
     */
    public update(id: number, tag: ScriptTag)
    {
        return this.createRequest<ScriptTag>("PUT", `${id}.json`, "script_tag", { script_tag: tag});
    }
    
    /**
     * Deletes the script tag with the given id.
     */
    public delete(id: number)
    {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}

/**
 * An entity representing a Shopify script tag.
 */
export interface ScriptTag extends ShopifyObject
{
    /**
     * The date and time the script tag was created.
     */
    created_at?: string;

    /**
     * DOM event which triggers the loading of the script. Currently, 'onload' is the only accepted value.
     */
    event?: "onload";

    /**
     * Specifies the src of the script tag, i.e. which URL to load it from.
     */
    src: string;

    /**
     * The date and time the script tag was updated.
     */
    updated_at?: string;
}