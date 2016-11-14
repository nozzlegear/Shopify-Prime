import { ShopifyObject } from "./base";

export interface TaxLine extends ShopifyObject {
    /**
     * The amount of tax to be charged.
     */
    price?: number;

    /**
     * The rate of tax to be applied.
     */
    rate?: number;

    /**
     * The name of the tax.
     */
    title?: string;
}