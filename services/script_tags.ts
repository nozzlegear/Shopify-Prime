import { ScriptTag } from "../typings/models/script_tag";
import BaseService from "../infrastructure/base_service";

// Enums
import { ScriptTagOptions } from "../typings/options/script_tags";
import { FieldOptions, ListOptions, DateOptions } from "../typings/options/base";

/**
 * A service for manipulating Shopify script tags.
 */
export default class ScriptTags extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "script_tags");
    }

    /**
     * Gets a count of all of the shop's script tags.
     * @param options Options for filtering the results.
     */
    public count(options?: ScriptTagOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a list of up to 250 of the shop's script tags.
     * @param options Options for filtering the results.
     */
    public list(options?: ScriptTagOptions & ListOptions & DateOptions & FieldOptions) {
        return this.createRequest<ScriptTag[]>("GET", ".json", "script_tags", options);
    }

    /**
     * Retrieves the script tag with the given id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: FieldOptions) {
        return this.createRequest<ScriptTag>("GET", `${id}.json`, "script_tag", options);
    }

    /**
     * Creates a new script tag.
     */
    public create(tag: ScriptTag) {
        return this.createRequest<ScriptTag>("POST", ".json", "script_tag", { script_tag: tag });
    }

    /**
     * Updates the script tag with the given id.
     * @param tag The updated script tag.
     */
    public update(id: number, tag: ScriptTag) {
        return this.createRequest<ScriptTag>("PUT", `${id}.json`, "script_tag", { script_tag: tag });
    }

    /**
     * Deletes the script tag with the given id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}