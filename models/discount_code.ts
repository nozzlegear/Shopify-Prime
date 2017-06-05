import { ShopifyObject } from "./base";

export interface DiscountCode extends ShopifyObject {
    /** 
     *  The amount of the discount.
     */
    amount?: string;

    /** 
     *  The discount code.
     */
    code?: string;

    /** 
     *  The type of discount. Known values are 'percentage', 'shipping', 'fixed_amount' and 'none'.
     */
    type?: "percentage" | "shipping" | "fixed_amount" | string;
}