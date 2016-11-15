import { ShopifyObject } from "./base";
import { ArticleImage } from "./article_image";

export interface Article extends ShopifyObject {
    /**
     * The name of the author of this article
     */
    author?: string;

    /**
     * A unique numeric identifier for the blog containing the article. 
     */
    blog_id?: number;

    /**
     * The text of the body of the article, complete with HTML markup.
     */
    body_html?: string;

    /**
     * The date and time when the article was created.
     */
    created_at?: string;

    /**
     * A human-friendly unique string for an article automatically generated from its title. It is used in the article's URL.
     */
    handle?: string;

    /**
     * The article image.
     */
    image?: ArticleImage;

    /**
     * States whether or not the article is visible. 
     */
    published?: boolean;

    /**
     * The date and time when the article was published. 
     */
    published_at?: string;

    /**
     * The text of the summary of the article, complete with HTML markup.
     */
    summary_html?: string;

    /**
     * Tags are additional short descriptors formatted as a string of comma-separated values. For example, if an article has three tags: tag1, tag2, tag3.
     */
    tags?: string;

    /**
     * States the name of the template an article is using if it is using an alternate template. If an article is using the default article.liquid template, the value returned is null.
     */
    template_suffix?: string;

    /**
     * The title of the article.
     */
    title?: string;

    /**
     * The date and time when the article was last updated.
     */
    updated_at?: string;

    /**
     * A unique numeric identifier for the author of the article.
     */
    user_id?: number;
}