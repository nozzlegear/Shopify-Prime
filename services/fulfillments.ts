import * as Options from '../options';
import { Fulfillment } from '../models';
import { BaseService } from '../infrastructure';

/**
 * A service for manipulating a blog's fulfillments.
 */
export class Fulfillments extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "orders");
    }

    private getPath(orderId: number, path: string) {
        return this.joinUriPaths(`${orderId}/fulfillments`, path);
    }

    /**
     * Creates a new fulfillment.
     * @param orderId Id of the blog that the fulfillment will belong to.
     * @param fulfillment The fulfillment being created.
     */
    public create(orderId: number, fulfillment: Fulfillment) {
        return this.createRequest<Fulfillment>("POST", this.getPath(orderId, ".json"), "fulfillment", { fulfillment });
    }

    /**
     * Updates an fulfillment with the given id.
     * @param orderId Id of the blog that the fulfillment belongs to.
     * @param fulfillmentId Id of the fulfillment to update.
     * @param fulfillment The updated fulfillment.
     */
    public update(orderId: number, fulfillmentId: number, fulfillment: Fulfillment) {
        return this.createRequest<Fulfillment>("PUT", this.getPath(orderId, ".json"), "fulfillment", { fulfillment });
    }

    /**
     * Gets an fulfillment with the given id.
     * @param orderId Id of the blog that the fulfillment belongs to.
     * @param fulfillmentId Id of the fulfillment being retrieved.
     * @param options Options for filtering the result.
     */
    public get(orderId: number, fulfillmentId: number, options?: Options.FieldOptions) {
        return this.createRequest<Fulfillment>("GET", this.getPath(orderId, `${fulfillmentId}.json`), "fulfillment", options);
    }

    /**
     * Lists up to 250 fulfillments for the given order.
     * @param orderId Id of the blog that the fulfillments belong to.
     * @param options Options for filtering the results.
     */
    public list(orderId: number, options?: Options.FieldOptions & Options.DateOptions & Options.ListOptions) {
        return this.createRequest<Fulfillment[]>("GET", this.getPath(orderId, ".json"), "fulfillments", options);
    }

    /**
     * Counts the fulfillments on the given order.
     * @param orderId Id of the blog that the fulfillments belong to.
     * @param options Options for filtering the results.
     */
    public count(orderId: number, options?: Options.DateOptions) {
        return this.createRequest<number>("GET", this.getPath(orderId, "count.json"), "count", options);
    }

    /**
     * Opens a fulfillment with the given fulfillmentId.
     * @param orderId Id of the blog that the fulfillments belong to.
     * @param fulfillmentId The fulfillment's id.
     */
    public open(orderId: number, fulfillmentId: number) {
        return this.createRequest<Fulfillment>("POST", this.getPath(orderId, `${fulfillmentId}/open.json`), 'fulfillment');
    }

    /**
     * Cancels a fulfillment with the given fulfillmentId.
     * @param fulfillmentId The fulfillment's id.
     * @param options Options for canceling the fulfillment.
     */
    public cancel(orderId: number, fulfillmentId: number) {
        return this.createRequest<Fulfillment>("POST", this.getPath(orderId, `${fulfillmentId}/cancel.json`), 'fulfillment');
    }

    /**
     * Complete a fulfillment with the given id.
     * @param fulfillmentId The fulfillment's id.
     * @param options Options for canceling the fulfillment.
     */
    public complete(orderId: number, fulfillmentId: number) {
        return this.createRequest<Fulfillment>("POST", this.getPath(orderId, `${fulfillmentId}/complete.json`), 'fulfillment');
    }
}

export default Fulfillments;