import { OrderStatus} from "../enums/order_status";
import { FinancialStatus } from "../enums/financial_status";
import { FulfillmentStatus } from "../enums/fulfillment_status";
import { InventoryBehavior } from "../enums/inventory_behavior";
import { OrderCancelReason } from "../enums/order_cancel_reason";
import { DateOptions, FieldOptions, ListOptions, ProcessedOptions } from "./base";

export interface OrderCountOptions extends DateOptions {
    status?: OrderStatus;

    financial_status?: FinancialStatus;

    fulfillment_status?: FulfillmentStatus;
}

export interface OrderListOptions extends FieldOptions, DateOptions, ProcessedOptions, ListOptions, OrderCountOptions {
    /**
     * A comma-separated list of order ids.
     */
    ids?: string;
}

export interface OrderCreateOptions {
    send_receipt?: boolean;

    send_fulfillment_receipt?: boolean;

    inventory_behavior?: InventoryBehavior;
}

export interface OrderCancelOptions {
    /**
     * Amount to refund. If set, Shopify will attempt to void/refund the payment depending on the status.
     */
    amount?: number;

    /**
     * Restock the items for this order back to your store.
     */
    restock?: boolean;

    /**
     * The reason for the order cancellation. 
     */
    reason?: OrderCancelReason;

    /**
     * Whether Shopify should send an email to the customer notifying them of the cancellation.
     */
    email?: boolean;

    /**
     * Required for some more complex refund situations.
     */
    refund?: any;
}