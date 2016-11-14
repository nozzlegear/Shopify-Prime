import { Order } from "../typings/models/order";
import BaseService from "../infrastructure/base_service";
import { Transaction } from "../typings/models/transaction";

// Enums
import { FieldOptions } from "../typings/options/base";
import { OrderCountOptions, OrderListOptions, OrderCreateOptions } from "../typings/options/orders";

export default class Orders extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "orders");
    }

    /**
     * Gets a count of all of the shop's orders.
     * @param options Options for filtering the results.
     */
    public count(options?: OrderCountOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a list of up to 250 of the shop's orders.
     * @param options Options for filtering the results.
     */
    public list(options?: OrderListOptions) {
        return this.createRequest<Order[]>("GET", ".json", "orders", options);
    }

    /**
     * Gets a list of up to 250 orders from the given customer.
     * @param customerId The customer's id.
     * @param options Options for filtering the results.
     */
    public listForCustomer(customerId: number, options?: OrderListOptions) {
        return this.createRequest<Order[]>("GET", ".json", "orders", Object.assign({ customer_id: customerId }, options));
    }

    /**
     * Gets the order with the given id.
     * @param orderId The order's id.
     * @param options Options for filtering the results.
     */
    public get(orderId: number, options?: FieldOptions) {
        return this.createRequest<Order>("GET", `${orderId}.json`, "order", options);
    }

    /**
     * Creates an order.
     * @param order The order being created.
     * @param options Options for creating the order.
     */
    public create(order: Order, transactions?: Transaction[], options?: OrderCreateOptions) {
        return this.createRequest<Order>("POST", ".json", "order", { order: Object.assign({}, order, options, { transactions }) });
    }

    /**
     * Updates an order with the given id.
     * @param id The order's id.
     * @param order The updated order.
     */
    public update(id: number, order: Order) {
        return this.createRequest<Order>("PUT", `${id}.json`, "order", { order });
    }

    /**
     * Deletes an order with the given id.
     * @param id The order's id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }

    /**
     * Closes an order with the given id.
     * @param id The order's id.
     */
    public close(id: number) {
        return this.createRequest<Order>("POST", `${id}/close.json`, "order");
    }

    /**
     * Opens an order with the given id.
     * @param id The order's id.
     */
    public open(id: number) {
        return this.createRequest<Order>("POST", `${id}/open.json`, "order");
    }
}