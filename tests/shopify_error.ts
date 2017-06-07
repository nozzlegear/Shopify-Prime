import * as Prime from '../';
import inspect from 'logspect/bin';
import {
    AsyncSetupFixture,
    AsyncTeardownFixture,
    AsyncTest,
    IgnoreTest,
    TestFixture,
    Timeout
    } from 'alsatian';
import { Config, Expect } from './test_utils';

@TestFixture("ShopifyError Tests") 
export class ShopifyErrorTests {
    private genericResponse = {
        ok: false,
        status: 422,
        statusText: "Unprocessable Entity",
        bodyUsed: true,
        size: "Unprocessable Entity".length,
        timeout: 100,
        type: "default",
        url: "",
    } as any;

    private rateLimitResponse = Object.assign({}, this.genericResponse, { statusText: "Too Many Requests", size: "Too Many Requests".length, status: 429 /* Too Many Requests */});

    private genericError = new Prime.Infrastructure.ShopifyError(this.genericResponse, {
        errors: {
            order: "must not be null"
        }
    });

    private rateLimitError = new Prime.Infrastructure.ShopifyError(this.rateLimitResponse, {
        errors: {
            error: "Exceeded 2 calls per second for api client. Reduce request rates to resume uninterrupted service."
        }
    })

    @AsyncTest("should have an isShopifyPrime flag")
    @Timeout(5000)
    public async Test1() {
        Expect(this.genericError.isShopifyPrime).toEqual(true);
    }

    @AsyncTest("should have a status code")
    @Timeout(5000)
    public async Test2() {
        Expect(this.genericError.statusCode).toEqual(422);
    }

    @AsyncTest("should have a status text")
    @Timeout(5000)
    public async Test3() {
        Expect(this.genericError.statusText).toEqual("Unprocessable Entity");
    }

    @AsyncTest("should not set the .apiRateLimitReached flag to true")
    @Timeout(5000)
    public async Test4() {
        Expect(this.genericError.apiRateLimitReached).toBe(false);
    }

    @AsyncTest("should set the .apiRateLimitReached flag to true")
    @Timeout(5000)
    public async Test5() {
        Expect(this.rateLimitError.statusCode).toEqual(429);
        Expect(this.rateLimitError.apiRateLimitReached).toBe(true);  
    }

    @AsyncTest("should have an errors object")
    @Timeout(5000)
    public async Test6() {
        Expect(this.genericError.errors).not.toBeNull();
        Expect(this.genericError.errors["order"]).toBeAnArray();
        Expect(this.genericError.errors["order"].length).toEqual(1);
        Expect(this.genericError.errors["order"][0]).toEqual("must not be null");
    }

    @AsyncTest("should not fail when given an unknown body")
    @Timeout(5000)
    public async Test7() {
        const error = new Prime.Infrastructure.ShopifyError(this.genericResponse, {} as any);

        Expect(error.isShopifyPrime).toEqual(true);
        Expect(error.statusText).toEqual("Unprocessable Entity");
        Expect(error.statusCode).toEqual(422);
        Expect(error.errors).not.toBeNull();
        Expect(Object.keys(error.errors).length).toEqual(0);
    }

    @AsyncTest("should parse a generic error")
    @Timeout(5000)
    public async Test8() {
        const error = new Prime.Infrastructure.ShopifyError(this.genericResponse, {
            errors: "Test error message"
        });

        Expect(error.errors["generic"].length).toEqual(1);
        Expect(error.errors["generic"][0]).toEqual("Test error message");
    }

    @AsyncTest("should parse an error with multiple properties")
    @Timeout(5000)
    public async Test9() {
        const error = new Prime.Infrastructure.ShopifyError(this.genericResponse, {
            errors: {
                order: "must not be null",
                customer: [
                    "must contain an id",
                    "must contain a name",
                ]
            }
        });

        Expect(error.errors["order"].length).toEqual(1);
        Expect(error.errors["order"][0]).toEqual("must not be null");
        Expect(error.errors["customer"].length).toEqual(2);
        Expect(error.errors["customer"]).toContain("must contain an id");
        Expect(error.errors["customer"]).toContain("must contain a name");
    }

    @AsyncTest("should parse an oauth code used error")
    @Timeout(5000)
    public async Test10() {
        const error = new Prime.Infrastructure.ShopifyError(this.genericResponse, { error: "invalid_request", error_description: "authorization code was not found or was already used" });

        Expect(error.errors["invalid_request"]).toContain("authorization code was not found or was already used");
    }
}