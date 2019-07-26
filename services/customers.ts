import * as Options from '../options';
import { BaseService } from '../infrastructure';
import {Customer, CustomerInvite} from '../models';

export class Customers extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "customers");
    }

    /**
     * Get a count of all customers
     */
    public count() {
        return this.createRequest<number>("GET", "count.json", "count");
    }

    /**
     * Get a list of all customers
     * @param options Options for filtering the results.
     */
    public list(options?: Options.DateOptions & Options.FieldOptions & Options.ListOptions) {
        return this.createRequest<Customer[]>("GET", ".json", "customers", options);
    }

    /**
     * Searches for customers that match a supplied query.
     * @param options Options for searching customers
     */
    public search(options?: Options.CustomerSearchOptions & Options.FieldOptions & Options.BasicListOptions) {
        return this.createRequest<Customer[]>("GET", "search.json", "customers", options);
    }

    /**
     * Get a single customer
     * @param id The customer's id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<Customer>("GET", `${id}.json`, "customer", options);
    }

    /**
     * Creates a customer.
     * @param customer The customer being created.
     * @param options Options for creating the customer.
     */
    public create(customer: Customer) {
        return this.createRequest<Customer>("POST", ".json", "customer", { customer: customer });
    }

    /**
     * Updates a customer with the given id.
     * @param id The customer's id.
     * @param customer The updated customer.
     */
    public update(id: number, customer: Customer) {
        return this.createRequest<Customer>("PUT", `${id}.json`, "customer", { customer: customer });
    }

    /**
     * Deletes a customer with the given id.
     * @param id The customer's id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }

    /**
     * Generate an account activation URL for a customer whose account is not yet enabled
     * @param id The customer's ids
     */
    public createActivationUrl(id: number) {
        return this.createRequest<string>("POST", `${id}/account_activation_url.json`, "account_activation_url");
    }

    /**
     * Sends an account invite to a customer.
     * @param invite Optional invitation to send
     */
    public invite(invite?: CustomerInvite) {
        return this.createRequest<CustomerInvite>("POST", "send_invite.json", "customer_invite", { customer_invite: invite })
    }
}

export default Customers;
