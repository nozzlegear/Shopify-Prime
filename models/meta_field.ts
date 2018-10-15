import { ShopifyObject } from "./base";

export interface MetaField extends ShopifyObject {
    /**
     * The date and time when the metafield was created.
     */
    created_at?: string;

    /**
     * The date and time when the metafield was last updated.
     */
    updated_at?: string;

    /**
     * Identifier for the metafield (maximum of 30 characters).
     */
    key: string;

    /**
     * Information to be stored as metadata. Must be either a string or an int.
     */
    value: string | number;

    /**
     * States whether the information in the value is stored as a 'string' or 'integer.'
     */
    value_type: "string" | "integer";

    /**
     * Container for a set of metadata. Namespaces help distinguish between metadata you created and metadata created by another individual with a similar namespace (maximum of 20 characters).
     */
    namespace: string;

    /**
     * Additional information about the metafield.
     */
    description: string;

    /**
     * The Id of the Shopify Resource that the metafield is associated with. This value could be the id of things like product, order, variant, collection.
     */
    owner_id?: number;

    /**
     * The name of the Shopify Resource that the metafield is associated with. This could be things like product, order, variant, collection.
     */
    owner_resource: string;
}
