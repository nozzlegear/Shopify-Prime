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
        
        const headers = new fetch.Headers();
        headers.append("Accept", "application/json");
        
        if (this.accessToken)
        {
            headers.append("X-Shopify-Access-Token", this.accessToken);
        }
        
        const url = new uri(this.shopDomain);
        url.protocol("https");
        url.path(`${this.resource}/${path}`);
        
        if ((method === "GET" || method === "DELETE") && payload)
        {
            url.query(stringify(payload));
        }
        else if (payload)
        {
            headers.append("Content-Type", "application/json");
        }
        
        //Fetch will only throw an exception when there is a network-related error, not when Shopify returns a non-200 response.
        const result = await fetch(url.toString(), {
            headers: headers, 
            method: method, 
            body: payload && JSON.stringify(payload)
        });
            
        const json = await result.json();
        
        if (!result.ok)
        {
            throw new ShopifyError(result, json);
        }
        
        return rootElement ? json[rootElement] as T : json as T; 
    }
}