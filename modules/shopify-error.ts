/// <reference path="./../typings/index.d.ts" />

import {IResponse} from "isomorphic-fetch";

export class ShopifyError extends Error
{
    constructor(response: IResponse, public body: {errors: string | {[index: string] : string | string[]}})
    {
        super();
        
        this.statusCode = response.status;
        this.statusText = response.statusText;
        this.message = `[Shopify Prime] ${this.statusCode} ${this.statusText}. `;
        
        // Errors can be any of the following: 
        // 1. { errors: "some error message"}
        // 2. { errors: { "order" : "some error message" } }
        // 3. { errors: { "order" : [ "some error message" ] } }
        
        let errors = body.errors;
        
        if (!errors)
        {
            return;
        }
        
        if (typeof errors === "string")
        {
            // errors is #1
            this.errors["generic"] = [errors];
        }
        else if (typeof errors === "object")
        {
            for (const property in errors)
            {
                const value = errors[property];
                
                this.errors[property] = Array.isArray(value) ? value : [value];
            }
        }
    }
    
    public get isShopifyPrime()
    {
        return true;
    }
    
    public statusCode: number;
    
    public statusText: string;
    
    public errors: {[index: string]: string[]} = {};
}