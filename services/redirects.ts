import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Redirect } from '../models';

/**
 * A service for manipulating Shopify redirects.
 */
export class Redirects extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "redirects");
    }

    /**
     * Gets a count of all of the shop's redirects.
     * @param options Options for filtering the results.
     */
    public count(options?: Options.RedirectOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a list of up to 250 of the shop's redirects.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.RedirectOptions & Options.ListOptions & Options.FieldOptions) {
        return this.createRequest<Redirect[]>("GET", ".json", "redirects", options);
    }

    /**
     * Retrieves the redirect with the given id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<Redirect>("GET", `${id}.json`, "redirect", options);
    }

    /**
     * Creates a new redirect.
     */
    public create(redirect: Redirect) {
        return this.createRequest<Redirect>("POST", ".json", "redirect", { redirect });
    }

    /**
     * Updates the redirect with the given id.
     * @param tag The updated redirect.
     */
    public update(id: number, redirect: Redirect) {
        return this.createRequest<Redirect>("PUT", `${id}.json`, "redirect", { redirect });
    }

    /**
     * Deletes the redirect with the given id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}

export default Redirects;