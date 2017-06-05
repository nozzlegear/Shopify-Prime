import { ShopifyObject } from "./base";
import { Variant } from "./variant";

// Enum imports
import { FinancialStatus } from "../enums/financial_status";

export interface Product extends ShopifyObject {

    /**
     * The description of the product, complete with HTML formatting.
     */
    body_html?: string

    /**
     * The date and time when the product was created.The API returns this value in ISO 8601 format.
     */
    created_at?: string

    /**
     * A human- friendly unique string for the Product automatically generated from its title.They are used by the Liquid templating language to refer to objects.
        */
    handle?: string

    /**
     * "images": ["src": "http://example.com/burton.jpg"]
     * A list of image objects, each one representing an image associated with the product.
     */
    images?: string[]

    /**
     * "options": ["name": "Title"]
     * Custom product property names like "Size", "Color", and "Material".Products are based on permutations of these options.A product may have a maximum of 3 options. 255 characters limit each.
     */
    options?: string[]

    /**
     * "product_type": "Cult Products"
     * A categorization that a product can be tagged with, commonly used for filtering and searching.
     */
    product_type?: string

    /**
     * "published_at": "2007-12-31T19:00:00-05:00"
     * The date and time when the product was published to the Online Store channel.The API returns this value in ISO 8601 format.A value of null indicates that the product is not published to Online Store.
     */
    published_at?: string

    /**
     * "published_scope": "global"
     * Indicates whether the product is published to the Point of Sale channel.
     * 
     * web: The product is not published to Point of Sale.
     * global: The product is published to Point of Sale.
     */
    published_scope?: string



    /**
     * "tags": "Emotive, Flash Memory, MP3, Music"
     * A categorization that a product can be tagged with, commonly used for filtering and searching.Each comma- separated tag has a character limit of 255.
     */
    tags?: string

    /**
     * "template_suffix": null
     * The suffix of the liquid template being used.By default, the original template is called product.liquid, without any suffix.Any additional templates will be: product.suffix.liquid.
     */
    template_suffix?: string

    /**
     * "title": "IPod Nano - 8GB"
     * The name of the product.In a shop's catalog, clicking on a product's title takes you to that product's page. On a product's page, the product's title typically appears in a large font.
     */
    title?: string

    /**
     * "metafields_global_title_tag": "IPod Nano - White, 8GB"
     * The name of the product, to be used for SEO purposes.This will generally be added to the < meta name= 'title' > tag.
     */
    metafields_global_title_tag?: string

    /**
     * "metafields_global_description_tag": "It's the small iPod with a big idea: Video."
     * The description of the product, to be used for SEO purposes.This will generally be added to the < meta name= 'description' > tag.
     */
    metafields_global_description_tag?: string

    /**
     * "updated_at": "2012-08-24T14:01:47-04:00"
     * The date and time when the product was last modified.The API returns this value in ISO 8601 format.
     */
    updated_at?: string

    variants?: Variant[]


    /**	
     * "vendor": "Apple"
     * The name of the vendor of the product.
     */
    vendor?: string

}