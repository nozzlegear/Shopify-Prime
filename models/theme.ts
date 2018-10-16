import { ShopifyObject } from "./base";

export interface Theme extends ShopifyObject {
    /**
     * The name of the theme.
     */
    name?: string;
    /**
     * The date and time (ISO 8601 format) when the theme was created.
     */
    created_at?: string;
    /**
     * The date and time ( ISO 8601 format) when the theme was last updated.
     */
    updated_at?: string;
    /**
     * Specifies how the theme is being used within the shop. Valid values:
     * * main: The theme is published. Customers see it when they visit the online store.
     * * unpublished: The theme is unpublished. Customers can't see it.
     * * demo: The theme is installed on the store as a demo. The theme can't be published until the merchant buys the full version.
     */
    role?: 'main' | 'unpublished' | 'demo';
    /**
     * A unique identifier applied to Shopify-made themes that are installed from the Shopify Theme Store Theme Store. Not all themes available in the Theme Store are developed by Shopify. Returns null if the store's theme isn't made by Shopify, or if it wasn't installed from the Theme Store.
     */
    theme_store_id?: number | null;
    /**
     * Whether the theme can currently be previewed.
     */
    previewable?: boolean;
    /**
     * Whether files are still being copied into place for this theme.
     */
    processing?: boolean;
}