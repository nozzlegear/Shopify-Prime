import { IgnoreTests } from 'alsatian';
import { Matcher } from 'alsatian/core';
import { MatchError } from 'alsatian/core/alsatian-core';

declare var process: { env: any; };

const env: { [prop: string]: string } = process.env;

// Grab secret keys
export const Config = {
    apiKey: env["shopify_prime_apiKey"] || env["apiKey"],
    secretKey: env["shopify_prime_secretKey"] || env["secretKey"],
    shopDomain: env["shopify_prime_shopDomain"] || env["shopDomain"],
    accessToken: env["shopify_prime_accessToken"] || env["accessToken"],
}


if (!Config.apiKey) {
    throw new Error(`Expected 'apiKey' in process.env to exist.`);
}

if (!Config.secretKey) {
    throw new Error(`Expected 'secretKey' in process.env to exist.`);
}

if (!Config.shopDomain) {
    throw new Error(`Expected 'shopDomain' in process.env to exist.`);
}

if (!/https:\/\//.test(Config.shopDomain)) {
    throw new Error(`Expected 'shopDomain' to be a full URL with 'https://' protocol.`);
}

if (!Config.accessToken) {
    throw new Error(`Expected 'accessToken' in process.env to exist.`);
}

export function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

@IgnoreTests("Not a test fixture")
export class MatcherExtension extends Matcher {
    constructor(value) {
        super(value);
    }

    readonly not: MatcherExtension;

    toBeType(expectedType: string) {
        const actualType = typeof(this.actualValue);
        const typesMatch= actualType === expectedType;

        if (this.shouldMatch && ! typesMatch) {
            throw new MatchError(`expected ${actualType} to be ${expectedType}.`, expectedType, actualType);
        } 
        
        if (! this.shouldMatch && typesMatch) {
            throw new MatchError(`expected ${actualType} to not be ${expectedType}.`, `not ${expectedType}`, actualType);
        }
    }

    toBeAnArray() {
        const isArray = Array.isArray(this.actualValue);
        const actualType = typeof(this.actualValue);

        if (this.shouldMatch && !isArray) {
            throw new MatchError(`expected value to be an array, but its type was ${actualType}.`, `an array`, `type ${actualType}`);
        }

        if (! this.shouldMatch && isArray) {
            throw new MatchError(`expected value to not be an array, but it was.`, `not an array`, `an array`);
        }
    }

    toBeGreaterThanOrEqualTo(value: number) {
        const isGte = this.actualValue >= value;
        
        if (this.shouldMatch && ! isGte) {
            throw new MatchError(`expected value to be greater than or equal to ${value}, but it was not.`, `greater than or equal to ${value}`, this.actualValue);
        }

        if (! this.shouldMatch && isGte) {
            throw new MatchError(`expected value to not be greater than or equal to ${value}, but it was.`, `not greater than or equal to ${value}`, this.actualValue);
        }
    }

    toBeLesserThanOrEqualTo(value: number) {
        const isLte = this.actualValue <= value;
        
        if (this.shouldMatch && ! isLte) {
            throw new MatchError(`expected value to be lesser than or equal to ${value}, but it was not.`, `lesser than or equal to ${value}`, this.actualValue);
        }

        if (! this.shouldMatch && isLte) {
            throw new MatchError(`expected value to not be lesser than or equal to ${value}, but it was.`, `not lesser than or equal to ${value}`, this.actualValue);
        }
    }

    toBeNullOrUndefined() {
        const isNullOrUndefined = this.actualValue === null || this.actualValue === undefined;

        if (this.shouldMatch && !isNullOrUndefined) {
            throw new MatchError(`expected value to be null or undefined, but it was not.`, `null or undefined`, this.actualValue);
        }

        if (! this.shouldMatch && isNullOrUndefined) {
            throw new MatchError(`expected value to not be null or undefined, but it was.`, `not null or undefined`, this.actualValue === null ? `null` : `undefined`);
        }
    }

    itemsToPassValidator<T>(validator: (item: T) => void) {
        if (!this.shouldMatch) {
            throw new MatchError(`Custom .itemsToPassValidator function is not useable with .not.`);
        }

        const value: any[] = this.actualValue;
        let error: MatchError;

        try {
            value.forEach(item => validator(item));
        } catch (_e) {
            error = _e;
        }


        if (this.shouldMatch && !!error) {
            throw error;
        }
    }
}

export const Expect = (value) => new MatcherExtension(value);