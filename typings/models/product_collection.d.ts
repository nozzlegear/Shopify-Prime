import { ShopifyObject } from "./base";

export interface ProductCollection extends ShopifyObject {

    /**
     * The description of the collection, complete with HTML markup. Many templates 
     * display this on their collection pages.
     */
    body_html?: string

    /**
     * A human-friendly unique string for the collection automatically generated from its title. This is used in shop themes by the Liquid templating language to refer to the collection. Limit of 255 characters.
     */
    handle?: string

    /**
     * Image associated with the collection. Valid values are:
     * - attachment: An image attached to a shop's theme returned as Base64-encoded binary data.
     * - src: Source URL that specifies the location of the image.
     */
    image?: { created_at?: string, src?: string, attachment?: string }

    /**
     * This can have two different types of values, depending on whether the collection has been published (i.e., made visible to customers):
     * - If the collection is published, this value is the date and time when it was published. The API returns this value in ISO 8601 format.
     * - If the collection is hidden (i.e., not published), this value is null. Changing a collection's status from published to hidden changes its published_at property to null.
     */
    published_at?: string

    /**
     * The sales channels in which the collection is visible.
     * "published_scope": "global"
     */
    published_scope?: string

    /**
     * The order in which products in the collection appear. Valid values are:
     * 
     * - alpha-asc: Alphabetically, in ascending order (A - Z).
     * - alpha-desc: Alphabetically, in descending order (Z - A).
     * - best-selling: By best-selling products.
     * - created: By date created, in ascending order (oldest - newest).
     * - created-desc: By date created, in descending order (newest - oldest).
     * - manual: Order created by the shop owner.
     * - price-asc: By price, in ascending order (lowest - highest).
     * - price-desc: By price, in descending order (highest - lowest).
     */
    sort_order?: string

    /**
     * The suffix of the liquid template being used. By default, the original template is called product.liquid, without any suffix. Any additional templates will be: product.suffix.liquid.
     */
    template_suffix?: string

    /**
     * The name of the collection. Limit of 255 characters.
     */
    title?: string

    /**
     * The date and time when the collection was last modified. The API returns this value in ISO 8601 format.
     */
    updated_at?: string
}


export interface CustomCollection extends ProductCollection {

    /**
     * Array of products in the collection
     * 
     * position - Product position in array 
     * product_id - Required when adding a new item
     * id - Required when shifting the position of a product that was previously added to the collection
     */
    collects: {
        product_id?: number
        id?: number,
        position?: number
    }[]

    /**
     * "key": "new"
     * "value": "newvalue"
     * "value_type": "string"
     * "namespace": "global"
     * 
     * Attaches additional metadata to a shop's resources:
     * 
     * - key (required): Identifier for the metafield (maximum of 30 characters). 
     * - namespace (required): Container for a set of metadata. Namespaces help distinguish between metadata you created and metadata created by another individual with a similar namespace (maximum of 20 characters).
     * - value (required): Information to be stored as metadata.
     * - value_type (required): States whether the information in the value is stored as a 'string' or 'integer.'
     * - description (optional): Additional information about the metafield.
     */
    metafield?: string

    /**
     * States whether the custom collection is visible. Valid values are "true" for visible and "false" for hidden.
     */
    published?: boolean
}

export interface SmartCollection extends ProductCollection {

    /**
     * If false, products must match all of the rules to be included in the collection. If true, products can only match one of the rules.
     */
    disjunctive?: boolean

    /**
     * The list of rules that define what products go into the smart collection. Each rule has the following properties:
     * 
     * relation:
     * The relationship between the column choice, and the condition.
     * Number relations:
     * 
     * greater_than: column value is greater than the condition.
     * less_than: column value is less than the condition.
     * equals: column value is equal to the condition.
     * not_equals: column value is not equal to the condition.
     * Text relations:
     * 
     * equals: column value is equal to the condition.
     * not_equals: column value is not equal to the condition.
     * starts_with: column value starts with the condition.
     * ends_with: column value ends with the condition.
     * contains: column value contains the condition.
     * not_contains: column value does not contain the condition.
     * condition:
     * Select products for a collection using a condition. Conditions are either strings or numbers, depending on the relation.
     * column:
     * The properties of a product that can be used to populate a collection.
     * 
     * The following columns are restricted to text relations:
     * 
     * title: product title.
     * type: product type.
     * vendor: product vendor.
     * variant_title: variant's title.
     * The following columns are restricted to number relations:
     * 
     * variant_compare_at_price: compare at price.
     * variant_weight: weight.
     * variant_inventory: inventory stock. Exception: not_equals does not work on variant_inventory.
     * variant_price: product price.
     * The following column is restricted to the equals relation:
     * 
     * tag: product tag.
     */
    rules?: { column: string, relation: string, condition: string }[]
}