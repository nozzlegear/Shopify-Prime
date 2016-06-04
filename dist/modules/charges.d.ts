/// <reference path="../../typings/index.d.ts" />
import { ShopifyObject } from "../index";
import { BaseService, FieldOptions, ListOptions } from "./base_service";
/**
 * A service for manipulating Shopify's ApplicationCharge API.
 */
export declare class Charges extends BaseService {
    constructor(shopDomain: string, accessToken: string);
    /**
     * Creates a new charge.
     */
    create(charge: Charge): Promise<Charge>;
    /**
     * Gets a charge with the given id.
     * @param id The id of the charge to get.
     * @param options Options for filtering the result.
     */
    get(id: number, options?: FieldOptions): Promise<Charge>;
    /**
     * Retrieves a list of all past and present charges.
     * @param options Options for filtering the result.
     */
    list(options?: ListOptions): Promise<Charge[]>;
    /**
     * Activates a charge. Can only be activated if the charge's status is "accepted".
     * @param id The id of the charge to activate.
     */
    activate(id: number): Promise<void>;
}
/**
 * Represents a one-time application charge.
 */
export interface Charge extends ShopifyObject {
    /**
     * The URL that the customer should be sent to, to accept or decline the application charge.
     */
    confirmation_url?: string;
    /**
     * The date and time when the application charge was created.
     */
    created_at?: string;
    /**
     * The name of the application charge, e.g. "Super Expensive One-time Charge".
     */
    name: string;
    /**
     * The price of the application charge. Note: Shopify returns this value as a string.
     */
    price: string | number;
    /**
     * The URL the customer is sent to once they accept/decline a charge.
     */
    return_url?: string;
    /**
     * The status of the charge.
     */
    status?: "pending" | "accepted" | "active" | "cancelled" | "declined" | "expired";
    /**
     * Whether or not the application charge is a test transaction.
     */
    test?: boolean;
    /**
     * The date and time when the recurring application charge was last updated.
     */
    updated_at?: string;
}
