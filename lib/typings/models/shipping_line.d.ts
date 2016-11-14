import { TaxLine } from "./tax_line";
import { ShopifyObject } from "./base";

export interface ShippingLine extends ShopifyObject {
    /**  
     * A reference to the shipping method.
     */
    code?: string;

    /**  
     * The price of this shipping method.
     */
    price?: number;

    /**  
     * The source of the shipping method.
     */
    source?: string;

    /**  
     * The title of the shipping method.
     */
    title?: string;

    /**  
     * A list of <see cref="ShopifyTaxLine"/> objects, each of which details the taxes applicable to this <see cref="ShopifyShippingLine"/>.
     */
    tax_lines?: TaxLine[];
}