/**
 * Note: This interface is not extended from ShopifyObject because it has not a default id
 */
export interface Asset {
    /**
     * A base64-encoded image.
     */
    attachment?: string;

    /**
     * The MIME representation of the content, consisting of the type and subtype of the asset.
     */
    content_type?: string;

    /**
     * The date and time (ISO 8601 format) when the asset was created.
     */
    created_at?: string;

    /**
     * he path to the asset within a theme. It consists of the file's directory and filename. For example, the asset assets/bg-body-green.gif is in the assets directory, so its key is assets/bg-body-green.gif.
     */
    key?: string;

    /**
     * The public-facing URL of the asset.
     */
    public_url?: string;

    /**
     * The asset size in bytes.
     */
    size?: number;

    /**
     * The ID for the theme that an asset belongs to.
     */
    theme_id?: number;

    /**
     * The date and time (ISO 8601 format) when an asset was last updated.
     */
    updated_at?: string;

    /**
     * The text content of the asset, such as the HTML and Liquid markup of a template file.
     */
    value?: string;
}