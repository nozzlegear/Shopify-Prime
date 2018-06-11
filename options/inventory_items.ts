import { BasicListOptions } from "./base";

export interface InventoryItemListOptions extends BasicListOptions {
    /**
     * Show only certain inventory items, specified by a comma-seperated list of IDs..
     */
    ids: string;
}