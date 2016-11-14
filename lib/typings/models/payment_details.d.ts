import { ShopifyObject } from "./base";

export interface PaymentDetails extends ShopifyObject {
    avs_result_code?: string;

    credit_card_bin?: string;

    cvv_result_code?: string;

    credit_card_number?: string;

    credit_card_company?: string;
}