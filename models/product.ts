import { ProductImage } from './product_image';
import { ProductOption } from './product_option';
import { ProductVariant } from './product_variant';
import { ShopifyObject } from './base';

export interface Product extends ShopifyObject {
    /** 
     * The name of the product. In a shop's catalog, clicking on a product's title takes you to that product's page.
     * On a product's page, the product's title typically appears in a large font.
     */ 
    title?: string;

    /** 
     * The description of the product, complete with HTML formatting.
     */ 
    body_html?: string;

    /** 
     * The date and time when the product was created. The API returns this value in ISO 8601 format.
     */ 
    created_at?: string;

    /** 
     * The date and time when the product was last modified. The API returns this value in ISO 8601 format.
     */ 
    updated_at?: string;

    /** 
     * The date and time when the product was published. The API returns this value in ISO 8601 format. 
     * Set to NULL to unpublish a product
     */ 
    published_at?: string;

    /** 
     * The name of the vendor of the product.
     */ 
    vendor?: string;

    /** 
     * A categorization that a product can be tagged with, commonly used for filtering and searching.
     */ 
    product_type?: string;

    /** 
     * A human-friendly unique string for the Product automatically generated from its title.
     * They are used by the Liquid templating language to refer to objects.
     */ 
    handle?: string;

    /** 
     * The suffix of the liquid template being used.
     * By default, the original template is called product.liquid, without any suffix.
     * Any additional templates will be: product.suffix.liquid.
     */ 
    template_suffix?: string;

    /** 
     * The sales channels in which the product is visible.
     */ 
    published_scope?: string;

    /** 
     * A categorization that a product can be tagged with, commonly used for filtering and searching.
     * Each comma-separated tag has a character limit of 255.
     */ 
    tags?: string;

    /** 
     * A list of variant objects, each one representing a slightly different version of the product.
     * For example, if a product comes in different sizes and colors, each size and color permutation (such as "small black", "medium black", "large blue"), would be a variant.
     * To reorder variants, update the product with the variants in the desired order.The position attribute on the variant will be ignored.
     */ 
    variants?: ProductVariant[];

    /** 
     * Custom product property names like "Size", "Color", and "Material".
     * Products are based on permutations of these options. 
     * A product may have a maximum of 3 options. 255 characters limit each.
     */ 
    options?: ProductOption[];

    /** 
     * A list of image objects, each one representing an image associated with the product.
     */ 
    images?: ProductImage[];

    /**
     * The name of the product, to be used for SEO purposes. This will generally be added to the <meta name='title'> tag.
     */
    metafields_global_title_tag?: string;

    /**
     * The description of the product, to be used for SEO purposes. This will generally be added to the <meta name='description'> tag.
     */
    metafields_global_description_tag?: string;
}