import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Charge } from '../models';

/**
 * A service for manipulating Shopify's ApplicationCharge API.
 */
export class Charges extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "application_charges");
    }

    /**
     * Creates a new charge.
     */
    public create(charge: Charge) {
        return this.createRequest<Charge>("POST", ".json", "application_charge", { application_charge: charge });
    }

    /**
     * Gets a charge with the given id.
     * @param id The id of the charge to get.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<Charge>("GET", `${id}.json`, "application_charge", options);
    }

    /**
     * Retrieves a list of all past and present charges.
     * @param options Options for filtering the result.
     */
    public list(options?: Options.ListOptions & Options.DateOptions & Options.FieldOptions) {
        return this.createRequest<Charge[]>("GET", ".json", "application_charges", options);
    }

    /**
     * Activates a charge. Can only be activated if the charge's status is "accepted".
     * @param id The id of the charge to activate.
     */
    public activate(id: number): Promise<void> {
        return this.createRequest<void>("POST", `${id}/activate.json`);
    }
}

export default Charges;