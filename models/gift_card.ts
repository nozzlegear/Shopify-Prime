import { ShopifyObject } from "./base";

/**
 * Represents a Shopify Gift Card.
 */
export interface GiftCard extends ShopifyObject {

    /**
     * The unique numeric identifier for the Gift Card.
     */
    id?: number;

    /**
     * A unique numeric identifier of the application that issued the gift card (if it was issued by an application).
     */
    api_client_id?: number;

    /**
     * A unique numeric identifier of the user that issued the gift card (if it was issued by a user).
     */
    user_id?: number;

    /**
     * A unique numeric identifier of the order that caused the creation of this gift card (if it was created by an order).
     */
    order_id?: number;

    /**
     * A unique numeric identifier of the line_item that caused the creation of this gift card (if it was created by an order).
     */
    line_item_id?: number;

    /**
     * Initial card value
     */
    initial_value?: number

    /**
     * The balance of the gift card.
     */
    balance?: number;

    /**
     * The currency of the gift card.
     */
    currency?: string;

    /**
     * The gift card code which consists of a minimum of 8 alphanumeric characters. For security reasons, this is only available upon creation of the gift card.
     */
    code?: string;

    /**
     * Because gift cards are alternate payment methods, the gift card code is masked the same way a credit card would be.
     */
    masked_code?: string;

    /**
     * The last four characters of the gift card code.
     */
    last_characters?: string;

    /**
     * The text of an optional note that a shop owner can attach to the gift card. Not visible to merchants.
     */
    note?: string;

    /**
     * When specified, the gift card will be rendered using gift_card.SUFFIX.liquid instead of gift_card.liquid.
     */
    template_suffix?: string;

    /**
     * The date and time when the gift card was created. The API returns this value in ISO 8601 format.
     */
    created_at?: Date

    /**
     * The date and time when the gift card was last modified. The API returns this value in ISO 8601 format.
     */
    updated_at?: Date;

    /**
     * The date and time when the gift card was disabled. The API returns this value in ISO 8601 format.
     */
    disabled_at?: Date;

    /**
     * The date and time when the gift card expires. The format must be YYYY-MM-DD.
     */
    expires_on?: Date;
}