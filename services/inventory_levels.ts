import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { InventoryLevel } from '../models';

/**
 * A service for manipulating Shopify's InventoryLevels API.
 */
export class InventoryLevels extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "inventory_levels");
    }

    /**
     * Gets a list of up to 250 of the shop's inventory levels.
     * @param options Options for filtering the result.
     */
    public list(options?: Options.InventoryLevelListOptions) {
        return this.createRequest<InventoryLevel[]>("GET", ".json", "inventory_levels", options);
    }

    /**
     * Adjusts the inventory level of an inventory item at a single location.
     * @param options Options for adjusting an inventory level.
     */
    public adjust(inventoryItemId: number, locationId: number, availableAdjustment: number) {
        return this.createRequest<void>("POST", `adjust.json`, "inventory_level",  {
            location_id: locationId,
            inventory_item_id: inventoryItemId,
            available_adjustment: availableAdjustment
        });
    }

    /**
     * Deletes an inventory level of an inventory item at a location.
     * @param inventoryItemId Id of the inventory item.
     * @param locationId Id of the location being retrieved.
     */
    public delete(inventoryItemId: number, locationId: number) {
        return this.createRequest<void>("DELETE", `.json?inventory_item_id=${inventoryItemId}&location_id=${locationId}`, "inventory_level");
    }

    /**
     * Connects an inventory item to a location by creating an inventory level at that location.
     * @param inventoryItemId Id of the inventory item.
     * @param locationId Id of the location being retrieved.
     * @param options Options for connecting an inventory level.
     */
    public connect(inventoryItemId: number, locationId: number, options?: { relocate_if_necessary?: boolean } ) {
        return this.createRequest<void>("POST", `connect.json`, "inventory_level",  {
            location_id: locationId,
            inventory_item_id: inventoryItemId,
            ...options
        });
    }

    /**
     * Sets the inventory level for an inventory item at a location.
     * @param inventoryLevel Inventory level being set.
     * @param options Options for adjusting an inventory level.
     */
    public set(inventoryLevel: InventoryLevel, options?: { disconnect_if_necessary?: boolean } ) {
        return this.createRequest<void>("POST", `set.json`, "inventory_level", {
            ...inventoryLevel,
            ...options
        });
    }
}

export default InventoryLevels;