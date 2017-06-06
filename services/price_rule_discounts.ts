import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { PriceRuleDiscountCode } from '../models';

/**
 * A service for manipulating Shopify Price Rules.
 */
export class PriceRuleDiscounts extends BaseService {

    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, `price_rules`);
    }

    private getPath(priceRuleId: number, path: string) {
        return this.joinUriPaths(`${priceRuleId}/discount_codes`, path);
    }

    /**
     * Returns a list of discount codes belonging to a specified price rule.
     * @param options Options for filtering the results.
     */
    public list(priceRuleId: number, options?: Options.ListOptions) {
        return this.createRequest<PriceRuleDiscountCode[]>("GET", this.getPath(priceRuleId, ".json"), "discount_codes", options);
    }

    /**
     * Creates a new discount code for a given price rule.
     * Note: Currently, you can only create a single discount code per price rule.
     */
    public create(priceRuleId: number, discount: PriceRuleDiscountCode) {
        return this.createRequest<PriceRuleDiscountCode>("POST", this.getPath(priceRuleId, ".json"), "discount_code", { discount_code: discount });
    }

    /**
     * Returns details about a single discount code object.
     */
    public get(priceRuleId: number, id: number) {
        return this.createRequest<PriceRuleDiscountCode>("GET", this.getPath(priceRuleId, `${id}.json`), "discount_code");
    }

    /**
     * Search by discount code.
     * 
     * The lookup endpoint does not return the discount code object, rather it returns the location of the 
     * discount code in the location header. 
     * 
     * // https://your-store-domain.myshopify.com/admin/discount_codes/lookup?code=discountCode
     */
    public lookup(priceRuleId: number, code: string) {
        return this.createRequest<PriceRuleDiscountCode>("GET", this.getPath(priceRuleId, `discount_codes/lookup?code=${code}`));
    }

    /**
     * Updates a single discount code for a given price rule.
     */
    public update(priceRuleId: number, id: number, discount: PriceRuleDiscountCode) {
        return this.createRequest<PriceRuleDiscountCode>("PUT", this.getPath(priceRuleId, `${id}.json`), "discount_code", { discount_code: discount });
    }

    /**
     * Deletes an existing discount code object.
     */
    public delete(priceRuleId: number, id: number) {
        return this.createRequest<void>("DELETE", this.getPath(priceRuleId, `${id}.json`));
    }
}

export default PriceRuleDiscounts;