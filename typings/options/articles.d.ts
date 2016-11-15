export interface ArticleListOptions {
    /**
     * Filter by article handle.
     */
    handle?: string;
}

export interface ArticleTagListOptions {
    /**
     * A flag to indicate only to a certain number of the most popular tags.
     */
    popular?: number;

    /**
     * The number of tags to return.
     */
    limit?: number;
}