import { ShopifyObject } from "./base";
import { Transaction } from "./transaction";

export interface Refund extends ShopifyObject {
    id: number;
    order_id: any;
    created_at?: string;
    note: string;
    restock?: any;
    user_id: number;
    processed_at?: string;
    refund_line_items: any[];
    transactions: Transaction[];
    order_adjustments: OrderAdjustment[];
}

export interface OrderAdjustment extends ShopifyObject {
    order_id: any;
    refund_id: number;
    amount: string;
    tax_amount: string;
    kind: string;
    reason: string;
}
