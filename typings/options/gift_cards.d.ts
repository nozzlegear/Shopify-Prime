export interface GiftCardOptions {
    /**
     * Field and direction to order results by
     */
    order: string;

    /**
     * Text to search gift cards
     */
    query: string;

    /**
     * Restrict results to only enabled/disabled gift cards. Note: This is only usabled
     * with the /admin/gift_cards.json api and not /admin/gift_cards/search.json
     */
    status: string;
}