/// <reference path="../../typings/index.d.ts" />
import { IResponse } from "isomorphic-fetch";
export declare class ShopifyError extends Error {
    body: {
        errors: string | {
            [index: string]: string | string[];
        };
    };
    constructor(response: IResponse, body: {
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
