import { OrderStatus} from "../enums/order_status";
import { FinancialStatus } from "../enums/financial_status";
import { FulfillmentStatus } from "../enums/fulfillment_status";
import { InventoryBehavior } from "../enums/inventory_behavior";
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