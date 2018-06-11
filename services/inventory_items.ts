import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { InventoryItem } from '../models';

/**
 * A service for manipulating Shopify's InventoryItems API.
 */
export class InventoryItems extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "inventory_items");
    }

    /**
     * Gets a inventory item with the given id.
     * @param id Id of the inventory item being retrieved.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<Location>("GET", `${id}.json`, "inventory_item", options);
    }

    /**
     * Gets a list of up to 250 of the shop's inventory items.
     * @param options Options for filtering the result.
     */
    public list(options: Options.InventoryItemListOptions) {
        return this.createRequest<InventoryItem[]>("GET", ".json", "inventory_items", options);
    }

    /**
     * Updates an inventory item with the given id.
     * @param id The inventory items's id.
     * @param inventoryItem The updated inventory item.
     */
    public update(id: number, inventoryItem: InventoryItem) {
        return this.createRequest<InventoryItem>("PUT", `${id}.json`, "inventory_item", { inventory_item: inventoryItem });
    }
}

export default InventoryItems;