import { GiftCard } from "../typings/models/gift_card";
import BaseService from "../infrastructure/base_service";
import { GiftCardOptions } from "../typings/options/gift_cards";
import { FieldOptions, ListOptions } from "../typings/options/base";

/**
 * A service for manipulating Shopify Gift Cards
 */
export default class GiftCards extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "");
    }

    /**
     * Creates a new Gift Card.
     */
    public create(giftCard: GiftCard) {
        return this.createRequest<GiftCard>("POST", "gift_cards.json", "gift_card", { gift_card: giftCard });
    }

    /**
     * Deletes the Gift Card with the given id.
     */
    public count() {
        return this.createRequest<void>("GET", `gift_cards/count.json`);
    }

    /**
     * Gets a paged list of up to 250 of the shop's Gift Cards
     * @param options Options for filtering the results.
     */
    public list(options?: GiftCardOptions & FieldOptions & ListOptions) {
        return this.createRequest<GiftCard[]>("GET", "gift_cards.json", "gift_cards", options);
    }

    /**
     * Retrieves the Gift Card with the given id.
     * @param options Options for filtering the results.
     */
    public get(id: number) {
        return this.createRequest<GiftCard>("GET", `gift_cards/${id}.json`, "gift_card");
    }

    /**
     * Disable a Gift Card.
     */
    public disable(id: number) {
        return this.createRequest<GiftCard>("POST", `gift_cards/${id}/disable.json`, "gift_card");
    }

    /**
     * Search for Giftcards matching the specified criteria
     * @param options Options for filtering the results.
     */
    public search(options?: GiftCardOptions & FieldOptions & ListOptions) {
        return this.createRequest<GiftCard[]>("GET", "gift_cards/search.json", "gift_cards", options);
    }
}
