import * as Options from '../options';
import { ApplicationCredit } from '../models';
import { BaseService } from '../infrastructure';

/**
 * A service for offering credits for payments made via the Application Charge, Recurring Application Charge, and Usage Charge APIs.
 */
export class ApplicationCredits extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "application_credits");
    }

    /**
     * Creates a new Application Credit.
     */
    public create(credit: ApplicationCredit) {
        return this.createRequest<ApplicationCredit>("POST", ".json", "application_credit", { application_credit: credit });
    }

    /**
     * Gets an application credit with the given id.
     * @param id The id of the credit to get.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<ApplicationCredit>("GET", `${id}.json`, "application_credit", options);
    }

    /**
     * Retrieves a list of all past and present application credits.
     * @param options Options for filtering the result.
     */
    public list(options?: Options.FieldOptions) {
        return this.createRequest<ApplicationCredit[]>("GET", ".json", "application_credits", options);
    }
}

export default ApplicationCredits;