import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { PriceRule } from '../models';

/**
 * A service for manipulating Shopify Price Rules.
 */
export class PriceRules extends BaseService {

    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "price_rules");
    }

    /**
     * Gets a list of up to 250 of the shop's Price Rules.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.ListOptions & Options.FieldOptions) {
        return this.createRequest<PriceRule[]>("GET", ".json", "price_rules", options);
    }

    /**
     * The API is currently restricted to what the Shopify Discounts admin section offers. Note that for
     * a price rule to be accessible via the admin section of Shopify, you will need to create a 
     * discount code as well. 
     */
    public create(PriceRule: PriceRule) {
        return this.createRequest<PriceRule>("POST", ".json", "price_rule", { price_rule: PriceRule });
    }

    /**
     * Retrieves the Price Rule with the given id.
     * @param options Options for filtering the results.
     */
    public get(id: number) {
        return this.createRequest<PriceRule>("GET", `${id}.json`, "price_rule");
    }

    /**
     * Updates the Price Rule with the given id.
     * @param tag The updated Price Rule.
     */
    public update(id: number, PriceRule: PriceRule) {
        return this.createRequest<PriceRule>("PUT", `${id}.json`, "price_rule", { price_rule: PriceRule });
    }

    /**
     * Deletes the Price Rule with the given id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}

export default PriceRules;