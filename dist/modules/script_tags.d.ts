/// <reference path="../../typings/index.d.ts" />
import { ShopifyObject, BaseService } from "../infrastructure";
import { FieldOptions, ListOptions, ScriptTagOptions } from "../options";
/**
 * A service for manipulating Shopify script tags.
 */
export declare class ScriptTags extends BaseService {
    constructor(shopDomain: string, accessToken: string);
    /**
     * Gets a count of all of the shop's script tags.
     * @param options Options for filtering the results.
     */
    count(options?: ScriptTagOptions): Promise<number>;
    /**
     * Gets a list of up to 250 of the shop's script tags.
     * @param options Options for filtering the results.
     */
    list(options?: ScriptTagOptions & ListOptions): Promise<ScriptTag[]>;
    /**
     * Retrieves the script tag with the given id.
     * @param options Options for filtering the results.
     */
    get(id: number, options?: FieldOptions): Promise<ScriptTag>;
    /**
     * Creates a new script tag.
     */
    create(tag: ScriptTag): Promise<ScriptTag>;
    /**
     * Updates the script tag with the given id.
     * @param tag The updated script tag.
     */
    update(id: number, tag: ScriptTag): Promise<ScriptTag>;
    /**
     * Deletes the script tag with the given id.
     */
    delete(id: number): Promise<void>;
}
/**
 * An entity representing a Shopify script tag.
 */
export interface ScriptTag extends ShopifyObject {
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
