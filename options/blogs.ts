export interface BlogListOptions {
    /**
     * Filter by blog handle.
     */
    handle?: string;

    /**
     * Filter results to after the specified ID,
     */
    since_id?: number;
}