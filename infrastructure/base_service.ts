import uri = require("jsuri");
import fetch from "node-fetch";
import { resolve } from "path";
import ShopifyError from "./shopify_error";

//Get package.json from 2-levels up as this file will be in dist/infrastructure.
const version = require(resolve(__dirname, "../../package.json")).version;

class BaseService {
    constructor(private shopDomain: string, private accessToken: string, private resource: string) {
        //Ensure resource starts with admin/
        if (! /^[\/]?admin\//ig.test(resource)) {
            this.resource = "admin/" + resource;
        }
    }

    public static buildDefaultHeaders() {
        const headers = {
            "Accept": "application/json",
            "User-Agent": `Shopify Prime ${version} (https://github.com/nozzlegear/shopify-prime)`
        }

        return headers;
    }

    protected async createRequest<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, rootElement?: string, payload?: Object) {
        method = method.toUpperCase() as any;

        const options = {
            headers: BaseService.buildDefaultHeaders(),
            method: method,
            body: undefined as string,
        };

        if (this.accessToken) {
            options.headers["X-Shopify-Access-Token"] = this.accessToken;
        }

        const url = new uri(this.shopDomain);
        url.protocol("https");

        //Ensure no erroneous double slashes in path and that it doesn't end in /.json
        url.path(`${this.resource}/${path}`.replace(/\/+/ig, "/").replace(/\/\.json/ig, ".json"));

        if ((method === "GET" || method === "DELETE") && payload) {
            for (const prop in payload) {
                const value = payload[prop];

                //Shopify expects qs array values to be joined by a comma, e.g. fields=field1,field2,field3
                url.addQueryParam(prop, Array.isArray(value) ? value.join(",") : value);
            }
        }
        else if (payload) {
            options.body = JSON.stringify(payload);

            options.headers["Content-Type"] = "application/json";
        }

        //Fetch will only throw an exception when there is a network-related error, not when Shopify returns a non-200 response.
        const result = await fetch(url.toString(), options);

        // Shopify implement 204 - no content for DELETE requests 
        if (result.status == 204) {
            return
        }

        let json = await result.text() as any;

        try {
            json = JSON.parse(json);
        }
        catch (e) {
            //Set ok to false to throw an error with the body's text.
            result.ok = false;
        }

        if (!result.ok) {
            throw new ShopifyError(result, json);
        }

        return rootElement ? json[rootElement] as T : json as T;
    }
}

export default BaseService;