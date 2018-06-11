import { BasicListOptions } from "./base";

export interface InventoryLevelListOptions extends BasicListOptions {
    /**
     * A comma-separated list of inventory item IDs.
     */
    inventory_item_ids?: string;

    /**
     * A comma-separated list of location IDs.
     */
    location_ids?: string;
}