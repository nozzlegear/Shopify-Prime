/// <reference path="./../typings/index.d.ts" />

import * as fetch from "isomorphic-fetch";
import {stringify} from "qs";
import uri = require("jsuri");

export class baseService
{
    constructor(private shopDomain: string, private accessToken: string, private resource: string)
    {
        this.headers = new Headers();
        
        if (accessToken)
        {
            this.headers.append("X-Shopify-Access-Token", accessToken);
        }
        
        throw new Error("Not Implemented");
    }
    
    private headers: Headers;
    
    public setCredentials(shopDomain: string, accessToken: string)
    {
        
    }
    
    public createRequest<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, payload?: Object)
    {
        method = method.toUpperCase() as any;
        
        const url = new uri(this.shopDomain);
        url.protocol("https");
        url.path(`${this.resource}/${path}`);
        
        if ((method === "GET" || method === "DELETE") && payload)
        {
            url.query(stringify(payload));
        }
        
        return fetch(url.toString(), {headers: this.headers, method: method, body: JSON.stringify(payload)})
            .then((result) =>
            {
                if (!result.ok)
                {
                    let error = result.json<ShopifyError>();
                }
                
                return result.json<T>(); 
            })
    }
}