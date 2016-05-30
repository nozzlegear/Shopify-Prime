/// <reference path="./../typings/index.d.ts" />

import uri = require("jsuri");
import {stringify} from "qs";
import {ShopifyError} from "./shopify-error";
import * as fetch from "isomorphic-fetch";

export class BaseService
{
    constructor(private shopDomain: string, private accessToken: string, private resource: string)
    {
        
    }
    
    public setCredentials(shopDomain: string, accessToken: string)
    {
        this.shopDomain = shopDomain;
        this.accessToken = accessToken;
    }
    
    public async createRequest<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, rootElement: string, payload?: Object)
    {
        method = method.toUpperCase() as any;
        
        const options = {
            headers: new fetch.Headers(),
            method: method,
            body: undefined as string,
        };
        
        options.headers.append("Accept", "application/json");
        
        if (this.accessToken)
        {
            options.headers.append("X-Shopify-Access-Token", this.accessToken);
        }
        
        const url = new uri(this.shopDomain);
        url.protocol("https");
        url.path(`${this.resource}/${path}`);
        
        if ((method === "GET" || method === "DELETE") && payload)
        {
            for (const prop in payload)
            {
                const value = payload[prop];
                
                //Shopify expects qs array values to be joined by a comma, e.g. fields=field1,field2,field3
                url.addQueryParam(prop, Array.isArray(value) ? value.join(",") : value);
            }
        }
        else if (payload)
        {
            options.body = JSON.stringify(payload);
            
            options.headers.append("Content-Type", "application/json");
        }
        
        //Fetch will only throw an exception when there is a network-related error, not when Shopify returns a non-200 response.
        const result = await fetch(url.toString(), options);
        const json = await result.json();
        
        if (!result.ok)
        {
            throw new ShopifyError(result, json);
        }
        
        return rootElement ? json[rootElement] as T : json as T; 
    }
}