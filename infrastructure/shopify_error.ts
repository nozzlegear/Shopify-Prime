import { Response } from 'node-fetch';

export type ErrorType1 = { errors: string };
export type ErrorType2 = { errors: { [index:string]: string | string[] } };
export type ErrorType3 = { error: string, error_description: string };

function isType1(err): err is ErrorType1 {
    return err.errors && (typeof(err.errors) === "string");
}

function isType2(err): err is ErrorType2 {
    return err.errors && (typeof(err.errors) === "object");
}

function isType3(err): err is ErrorType3 {
    return err.error && err.error_description;
}

export class ShopifyError extends Error {
    constructor(response: { status: number, statusText: string}, public body: ErrorType1 | ErrorType2 | ErrorType3) {
        super();

        this.statusCode = response.status;
        this.statusText = response.statusText;
        this.apiRateLimitReached = this.statusCode === 429 /* Too Many Requests */;
        this.message = `[Shopify Prime] ${this.statusCode} ${this.statusText}. `;

        // Errors can be any of the following: 
        // 1. { errors: "some error message"}
        // 2. { errors: { "order" : "some error message", "customer": [ "some error message" ] } }
        // 3. { error: "invalid_request", error_description:"The authorization code was not found or was already used" }

        if (isType1(body)) {
            this.errors["generic"] = [body.errors];
        } else if (isType2(body)) {
            for (const property in body.errors) {
                const value = body.errors[property];

                this.errors[property] = Array.isArray(value) ? value : [value];
            }
        } else if (isType3(body)) {
            this.errors[body.error] = [body.error_description];
        }
    }

    public get isShopifyPrime() {
        return true;
    }

    /**
     * True when the requesting application has made too many requests and reached Shopify's API rate limit.
     */
    public apiRateLimitReached = false;

    public statusCode: number;

    public statusText: string;

    public errors: { [index: string]: string[] } = {};
}

export default ShopifyError;