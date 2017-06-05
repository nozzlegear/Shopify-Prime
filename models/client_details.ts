import { ShopifyObject } from "./base";

export interface ClientDetails extends ShopifyObject {
    /** 
     * Shopify does not offer documentation for this field.
     */
    accept_language?: string;

    /** 
     *  The browser screen height in pixels, if available.
     */
    browser_height?: string;

    /** 
     *  The browser IP address.
     */
    browser_ip?: string;

    /** 
     *  The browser screen width in pixels, if available.
     */
    browser_width?: string;

    /** 
     *  A hash of the session.
     */
    session_height?: string;

    /** 
     *  The browser's user agent string.
     */
    user_agent?: string;
}