import { ShopifyObject } from "./base";

export interface InventoryLevel extends ShopifyObject {
    /*
     * The unique identifier of the inventory item that the inventory level belongs to
     */
    inventory_item_id?: number;

    /*
     * The unique identifier of the location that the inventory level belongs to. In order to find the ID of the location, use the Location API.
     */
    location_id?: number;

    /*
     * The quantity of inventory items available for sale. Returns null if the inventory item is not tracked.
     */
    available?: number;
}