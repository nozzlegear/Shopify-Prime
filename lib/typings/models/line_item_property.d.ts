import { ShopifyObject } from "./base";

export interface LineItemProperty extends ShopifyObject {
    /**
     * The name of the note attribute.
     */
    name?: string;

    /**
     * The value of the note attribute.
     */
    value?: any;
}