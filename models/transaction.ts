import { ShopifyObject } from "./base";
import { PaymentDetails } from "./payment_details";

// Enums
import { TransactionKind } from "../enums/transaction_kind";
import { TransactionStatus } from "../enums/transaction_status";
    
export interface Transaction extends ShopifyObject {
    /** 
     * The amount of money that the transaction was for. Note: Shopify may return this property as a string.
     */
    amount?: string | number;

    /** 
     * The authorization code associated with the transaction.
     */
    authorization?: string;

    /** 
     * The date and time when the transaction was created.
     */
    created_at?: string;

    /** 
     * The unique identifier for the device.
     */
    device_id?: string;

    /** 
     * The name of the gateway the transaction was issued through.
     */
    gateway?: string;

    /** 
     * The origin of the transaction. This is set by Shopify and cannot be overridden. Example values include: 'web', 'pos', 'iphone', 'android'.
     */
    source_name?: string;

    /** 
     * An object containing information about the credit card used for this transaction.
     */
    payment_details?: PaymentDetails;

    /** 
     * The kind of transaction. Known values are 'authorization', 'capture', 'sale', 'void' and 'refund'.
     */
    kind?: TransactionKind;

    /** 
     * A unique numeric identifier for the order.
     */
    order_id?: number;

    /** 
     * Shopify does not currently offer documentation for this object.
     */
    receipt?: any;

    /** 
     * A standardized error code, e.g. 'incorrect_number', independent of the payment provider. Value can be null. A full list of known values can be found at https://help.shopify.com/api/reference/transaction.
     */
    error_code?: string;

    /** 
     * The status of the transaction. Known values are: pending, failure, success or error.
     */
    status?: TransactionStatus;

    /** 
     * Whether the transaction is for testing purposes.
     */
    test?: boolean;

    /** 
     * The unique identifier for the user.
     */
    user_id?: number;

    /** 
     * The three letter code (ISO 4217) for the currency used for the payment.
     */
    currency?: string;
}