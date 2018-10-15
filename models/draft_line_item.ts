import { LineItem } from "./line_item";
import { AppliedDiscount } from "./applied_discount";

export interface DraftLineItem extends LineItem {
    /**
     * Indicates if this is a product variant line item, or a custom line item. If set to true indicates a custom line item. If set to false indicates a product variant line item. This is a read only field.
     */
    custom?: boolean;

    /**
     * Discount which will be applied to the line item or the overall order.
     */
    applied_discount: AppliedDiscount;
}
