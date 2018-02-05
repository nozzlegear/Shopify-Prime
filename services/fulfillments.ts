import * as Options from '../options';
import { Fulfillment } from '../models';
import { BaseService } from '../infrastructure';

/**
 * A service for manipulating a blog's fulfillments.
 */
export class Fulfillments extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "");
    }

    /**
     * Creates a new fulfillment.
     * @param orderId Id of the blog that the fulfillment will belong to.
     * @param fulfillment The fulfillment being created.
     */
    public create(orderId: number, fulfillment: Fulfillment) {
        return this.createRequest<Fulfillment>("POST", `orders/${orderId}/fulfillments.json`, "fulfillment", { fulfillment });
    }

    /**
     * Updates an fulfillment with the given id.
     * @param orderId Id of the blog that the fulfillment belongs to.
     * @param fulfillmentId Id of the fulfillment to update.
     * @param fulfillment The updated fulfillment.
     */
    public update(orderId: number, fulfillmentId: number, fulfillment: Fulfillment) {
        return this.createRequest<Fulfillment>("PUT", `orders/${orderId}/fulfillments/${fulfillmentId}.json`, "fulfillment", { fulfillment });
    }

    /**
     * Gets an fulfillment with the given id.
     * @param orderId Id of the blog that the fulfillment belongs to.
     * @param fulfillmentId Id of the fulfillment being retrieved.
     * @param options Options for filtering the result.
     */
    public get(orderId: number, fulfillmentId: number, options?: Options.FieldOptions) {
        return this.createRequest<Fulfillment>("GET", `orders/${orderId}/fulfillments/${fulfillmentId}.json`, "fulfillment", options);
    }

    /**
     * Lists up to 250 fulfillments for the given blog.
     * @param orderId Id of the blog that the fulfillments belong to.
     * @param options Options for filtering the results.
     */
    public list(orderId: number, options?: Options.FulfillmentListOptions) {
        return this.createRequest<Fulfillment[]>("GET", `orders/${orderId}/fulfillments.json`, "fulfillments", options);
    }

    /**
     * Counts the fulfillments on the given blog.
     * @param orderId Id of the blog that the fulfillments belong to.
     * @param options Options for filtering the results.
     */
    public count(orderId: number, options?: Options.FulfillmentCountOptions) {
        return this.createRequest<number>("GET", `orders/${orderId}/fulfillments/count.json`, "count", options);
    }

    /**
     * Opens a fulfillment with the given id.
     * @param id The fulfillment's id.
     */
    public open(id: number) {
        return this.createRequest<Fulfillment>("POST", `${id}/open.json`, 'fulfillment');
    }

    /**
     * Cancels a fulfillment with the given id.
     * @param id The fulfillment's id.
     * @param options Options for canceling the fulfillment.
     */
    public cancel(id: number) {
        return this.createRequest<Fulfillment>("POST", `${id}/cancel.json`, 'fulfillment');
    }

    /**
     * Complete a fulfillment with the given id.
     * @param id The fulfillment's id.
     * @param options Options for canceling the fulfillment.
     */
    public complete(id: number) {
        return this.createRequest<Fulfillment>("POST", `${id}/complete.json`, 'fulfillment');
    }
}

export default Fulfillments;