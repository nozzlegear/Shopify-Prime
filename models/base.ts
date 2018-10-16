export interface ShopifyObject {
    /**
     * The object's unique id.
     */
    id?: number;
    /**
     * To help with migrating from our REST to the GraphQL, REST responses now include the GraphQL Admin API ID field, admin_graphql_api_id,. The ID in this field can be used to query the object directly using the GraphQL Admin API.
     */
    admin_graphql_api_id?: string;
}