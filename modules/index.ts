/// <reference path="./../typings/index.d.ts" />

import * as fetch from "isomorphic-fetch";
import {stringify} from "qs";
import uri = require("jsuri");

export class ShopifyError extends Error
{
    constructor(data: any)
    {
        super();
    }
}

export class BaseService
{
    constructor(private shopDomain: string, private accessToken: string, private resource: string)
    {
        if (accessToken)
        {
            this.headers.append("X-Shopify-Access-Token", accessToken);
        }
    }
    
    private headers = new Headers();
    
    public setCredentials(shopDomain: string, accessToken: string)
    {
        this.shopDomain = shopDomain;
        
        this.headers.set("X-Shopify-Access-Token", accessToken);
    }
    
    public async createRequest<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, rootElement: string, payload?: Object)
    {
        method = method.toUpperCase() as any;
        
        const url = new uri(this.shopDomain);
        url.protocol("https");
        url.path(`${this.resource}/${path}`);
        
        if ((method === "GET" || method === "DELETE") && payload)
        {
            url.query(stringify(payload));
        }
        
        //Fetch will only throw an exception when there is a network-related error, not when Shopify returns a non-200 response.
        const result = await fetch(url.toString(), {
            headers: this.headers, 
            method: method, 
            body: payload && JSON.stringify(payload)
        });
            
        if (!result.ok)
        {
            let error = result.json();
            
            throw new ShopifyError(error);
        }
        
        return result.json()[rootElement] as T; 
    }
}