import { FieldOptions } from "../typings/options/base";
import BaseService from "../infrastructure/base_service";
import { ApplicationCredit } from "../typings/models/application_credit";

/**
 * A service for offering credits for payments made via the Application Charge, Recurring Application Charge, and Usage Charge APIs.
 */
export default class ApplicationCredits extends BaseService {
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
    public get(id: number, options?: FieldOptions) {
        return this.createRequest<ApplicationCredit>("GET", `${id}.json`, "application_credit", options);
    }

    /**
     * Retrieves a list of all past and present application credits.
     * @param options Options for filtering the result.
     */
    public list(options?: FieldOptions) {
        return this.createRequest<ApplicationCredit[]>("GET", ".json", "application_credits", options);
    }
}