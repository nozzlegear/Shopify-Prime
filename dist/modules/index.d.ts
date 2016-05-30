/// <reference path="../../typings/index.d.ts" />
import * as fetch from "isomorphic-fetch";
export declare class ShopifyError extends Error {
    body: {
        errors: string | {
            [index: string]: string | string[];
        };
    };
    constructor(response: fetch.IResponse, body: {
        errors: string | {
            [index: string]: string | string[];
        };
    });
    isShopifyPrime: boolean;
    statusCode: number;
    statusText: string;
    errors: {
        [index: string]: string[];
    };
}
export declare class BaseService {
    private shopDomain;
    private accessToken;
    private resource;
    constructor(shopDomain: string, accessToken: string, resource: string);
    setCredentials(shopDomain: string, accessToken: string): void;
    createRequest<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, rootElement: string, payload?: Object): Promise<T>;
}
