import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Blog } from '../models';

/**
 * A service for manipulating a Shopify shop's blogs. For manipulating a blog's posts, use the Articles class instead.
 */
export class Blogs extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "blogs");
    }

    /**
     * Creates a new blog.
     * @param blog The Blog being created.
     */
    public create(blog: Blog) {
        return this.createRequest<Blog>("POST", `.json`, "blog", { blog });
    }

    /**
     * Gets a blog with the given id.
     * @param id Id of the blog to retrieve.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<Blog>("GET", `${id}.json`, "blog", options);
    }

    /**
     * Updates the blog with the given id.
     * @param id Id of the blog being updated.
     * @param blog The updated blog.
     */
    public update(id: number, blog: Blog) {
        return this.createRequest<Blog>("PUT", `${id}.json`, "blog", { blog });
    }

    /**
     * Gets a list of all blogs on the shop.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.FieldOptions & Options.BlogListOptions) {
        return this.createRequest<Blog[]>("GET", `.json`, "blogs", options);
    }

    /**
     * Gets a count of all blogs on the shop.
     */
    public count() {
        return this.createRequest<number>("GET", "count.json", "count");
    }

    /**
     * Deletes the blog with the given id.
     * @param id Id of the blog being deleted.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}

export default Blogs;