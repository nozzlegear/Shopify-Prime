/// <reference path="./../typings/index.d.ts" />

import uri = require("jsuri");
import {ShopifyError} from "./shopify_error";
import * as fetch from "node-fetch";

declare var require: any;

const version = require("../../package.json").version;

export class BaseService
{
    constructor(private shopDomain: string, private accessToken: string, private resource: string)
    {
        //Ensure resource starts with admin/
        if (! /^[\/]?admin\//ig.test(resource))
        {
            this.resource = "admin/" + resource;
        }
    }
    
    public static buildDefaultHeaders()
    {
        const headers = new fetch.Headers();
        
        headers.append("Accept", "application/json");
        headers.append("User-Agent", `Shopify Prime ${version} (https://github.com/nozzlegear/shopify-prime)`);
        
        return headers;
    }
    
    public setCredentials(shopDomain: string, accessToken: string)
    {
        this.shopDomain = shopDomain;
        this.accessToken = accessToken;
    }
    
    public async createRequest<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, rootElement?: string, payload?: Object)
    {
        method = method.toUpperCase() as any;
        
        const options = {
            headers: BaseService.buildDefaultHeaders(),
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
        
        //Ensure no erroneous double slashes in path and that it doesn't end in /.json
        url.path(`${this.resource}/${path}`.replace(/\/+/ig, "/").replace(/\/\.json/ig, ".json"));
        
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
        let json = await result.text() as any;
        
        try
        {
            json = JSON.parse(json);
        }
        catch (e)
        {
            //Set ok to false to throw an error with the body's text.
            result.ok = false;
        }
        
        if (!result.ok)
        {
            throw new ShopifyError(result, json);
        }
        
        return rootElement ? json[rootElement] as T : json as T; 
    }
}

export interface FieldOptions
{
    /**
     * Restricts the result to only the fields specified.
     */
    fields?: string[];
}

export interface ListOptions extends FieldOptions
{
    /**
     * Restricts results to those created after the given id.
     */
    since_id?: number;
}