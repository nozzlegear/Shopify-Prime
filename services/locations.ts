import * as Options from '../options';
import { Location } from '../models';
import { BaseService } from '../infrastructure';

/**
 * A service for manipulating a shops Locations API.
 */
export class Locations extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "locations");
    }

    /**
     * Gets a location with the given id.
     * @param id Id of the location being retrieved.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<Location>("GET", `${id}.json`, "location", options);
    }

    /**
     * Lists up to 250 locations.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.FieldOptions) {
        return this.createRequest<Location[]>("GET", `.json`, "locations", options);
    }

    /**
     * Counts the amount of locations.
     */
    public count() {
        return this.createRequest<number>("GET", `count.json`, "count");
    }

    /**
     * Lists all the inventory levels on a location.
     */
    public inventoryLevels(locationId: number) {
        return this.createRequest<Location>("GET", `${locationId}/inventory_levels.json`, "inventory_levels");
    }
}

export default Locations;
