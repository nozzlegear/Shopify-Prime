import { FinancialStatus } from "../enums/financial_status";
import { FulfillmentStatus } from "../enums/fulfillment_status";
import { DateOptions, FieldOptions, ListOptions, ProcessedOptions } from "./base";

export interface FulfillmentCountOptions extends DateOptions {
    status?: FulfillmentStatus;

    financial_status?: FinancialStatus;

    fulfillment_status?: FulfillmentStatus;
}

export interface FulfillmentListOptions extends FieldOptions, DateOptions, ProcessedOptions, ListOptions, FulfillmentCountOptions {
    /**
     * A comma-separated list of order ids.
     */
    ids?: string;
}
