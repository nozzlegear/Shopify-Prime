import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Theme } from '../models';

/**
 * A service for manage Shopify shop's theme.
 */
export class Themes extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "themes");
    }

    /**
     * Creates a theme by providing the public URL of a ZIP file that contains the theme.
     * @param themes The theme being created.
     */
    public create(themes: Theme) {
        return this.createRequest<Theme>("POST", `.json`, "", { themes });
    }

    /**
     * Gets a tsingle hemes with the given id.
     * @param id Id of the theme to retrieve.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<Theme>("GET", `${id}.json`, "", options);
    }

    /**
     * Updates an existing theme.
     * @param id Id of the themes being updated.
     * @param themes The updated theme.
     */
    public update(id: number, themes: Theme) {
        return this.createRequest<Theme>("PUT", `${id}.json`, "themes", { themes });
    }

    /**
     * Gets a list of all themes on the shop.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.FieldOptions) {
        return this.createRequest<Theme[]>("GET", `.json`, "themes", options);
    }

    /**
     * Deletes the themes with the given id.
     * @param id Id of the theme being deleted.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}

export default Themes;