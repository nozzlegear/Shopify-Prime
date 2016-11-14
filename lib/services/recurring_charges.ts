import BaseService from "../infrastructure/base_service";
import { RecurringCharge } from "../typings/models/recurring_charge";
import { FieldOptions, ListOptions, DateOptions } from "../typings/options/base";

/**
 * A service for manipulating Shopify's RecurringCharge API.
 */
export default class RecurringCharges extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "recurring_application_charges");
    }

    /**
     * Creates a new charge.
     */
    public create(charge: RecurringCharge) {
        return this.createRequest<RecurringCharge>("POST", ".json", "recurring_application_charge", { recurring_application_charge: charge });
    }

    /**
     * Gets a charge with the given id.
     * @param id The id of the charge to get.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: FieldOptions) {
        return this.createRequest<RecurringCharge>("GET", `${id}.json`, "recurring_application_charge", options);
    }

    /**
     * Retrieves a list of all past and present charges.
     * @param options Options for filtering the result.
     */
    public list(options?: ListOptions & DateOptions & FieldOptions) {
        return this.createRequest<RecurringCharge[]>("GET", ".json", "recurring_application_charges", options);
    }

    /**
     * Activates a charge. Can only be activated if the charge's status is "accepted".
     * @param id The id of the charge to activate.
     */
    public activate(id: number): Promise<void> {
        return this.createRequest<void>("POST", `${id}/activate.json`);
    }

    /**
     * Deletes a charge.
     * @param id The id of the charge to delete.
     */
    public delete(id: number): Promise<void> {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}