import { ShopifyObject } from "./base";
import { BlogCommentable } from "../enums/blog_commentable";

export interface Blog extends ShopifyObject {
    /**
     * Indicates whether readers can post comments to the blog and if comments are moderated or not. Possible values are:
     * "no" (default): Readers cannot post comments to blog articles.
     * "moderate": Readers can post comments to blog articles, but comments must be moderated before they appear.
     * "yes": Readers can post comments to blog articles without moderation.
     */
    commentable?: BlogCommentable;

    /**
     * The date and time the blog was created.
     */
    created_at?: string;

    /**
     * Feedburner is a web feed management provider and can be enabled to provide custom RSS feeds for Shopify bloggers. This property will default to blank or null unless feedburner is enabled through the shop admin.
     * Shopify does not document the value type for this property.
     */
    feedburner?: any;

    /**
     * URL to the feedburner location for blogs that have enabled feedburner through their store admin.
     */
    feedburner_url?: string;

    /**
     * A human-friendly unique string for a blog automatically generated from its title. This handle is used by the Liquid templating language to refer to the blog.
     */
    handle?: string;

    /**
     * Tags are additional short descriptors formatted as a string of comma-separated values. For example, if an article has three tags: tag1, tag2, tag3.
     */
    tags?: string;

    /**
     * States the name of the template a blog is using if it is using an alternate template. If a blog is using the default blog.liquid template, the value returned is "null".
     */
    template_suffix?: string;

    /**
     * The title of the blog.
     */
    title?: string;

    /**
     * The date and time when changes were last made to the blog's properties. Note that this is not updated when creating, modifying or deleting articles in the blog.
     */
    updated_at?: string;
}