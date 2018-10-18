import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Asset, AssetData, ListAssetData } from '../models';

/**
 * A service for manipulating a Shopify shop's theme asset.
 */
export class Assets extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "themes");
    }

    /**
     * Retrieves a single asset for a theme
     * @param id Id of the theme.
     * @param key he path to the asset within a theme.
     * @param options Options for filtering the result.
     */
    public get(id: number, key: string, options?: Options.FieldOptions) {
        return this.createRequest<AssetData>("GET", `${id}/assets.json?asset[key]=${key}&theme_id=${id}`, "", options);
    }

    /**
     * Creates or updates an asset for a theme.
     * You can include the `src` or `source_key` property to create the asset from an existing file.
     * @param id Id of the assets being updated.
     * @param assets The updated asset.
     */
    public update(id: number, asset: Asset) {
        return this.createRequest<AssetData>("PUT", `${id}/assets.json`, "", { asset });
    }

    /**
     * Retrieves a list of assets for a theme
     * @param id Id of the theme.
     * @param options Options for filtering the results.
     */
    public list(id: number, options?: Options.FieldOptions) {
        return this.createRequest<ListAssetData>("GET", `${id}/assets.json`, "", options);
    }

    /**
     * Deletes the assets with the given id.
     * @param id Id of the asset being deleted.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}/assets.json`, "");
    }
}

export default Assets;