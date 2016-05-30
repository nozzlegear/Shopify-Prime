/// <reference path="./../typings/index.d.ts" />

import {expect} from "chai";
import {ShopifyError} from "../dist";
import fetch = require("isomorphic-fetch");

describe("ShopifyError", function ()
{
    const genericResponse: fetch.IResponse = {
        ok: false,
        status: 422,
        statusText: "Unprocessable Entity",
        bodyUsed: true,
        size: "Unprocessable Entity".length,
        timeout: 100,
        type: "default",
        url: "",        
    } as any;
    
    const genericError = new ShopifyError(genericResponse, {
        errors: {
            order: "must not be null"
        }
    });
    
    it ("should have an isShopifyPrime flag", () =>
    {
       expect(genericError.isShopifyPrime).to.equal(true);
    });
    
    it ("should have a status code", () =>
    {
        expect(genericError.statusCode).to.equal(422);
    });
    
    it ("should have a status text", () =>
    {
        expect(genericError.statusText).to.equal("Unprocessable Entity");
    });
    
    it ("should have an errors object", () =>
    {
        expect(genericError.errors).to.not.be.null;
        expect(genericError.errors["order"]).to.be.a("array");
        expect(genericError.errors["order"].length).to.equal(1);
        expect(genericError.errors["order"][0]).to.equal("must not be null");
    });
    
    it ("should not fail when given an unknown body", () =>
    {
        const error = new ShopifyError(genericResponse, {} as any);
        
        expect(error.isShopifyPrime).to.equal(true);
        expect(error.statusText).to.equal("Unprocessable Entity");
        expect(error.statusCode).to.equal(422);
        expect(error.errors).to.not.be.null;
        expect(Object.keys(error.errors).length).to.equal(0);
    });
    
    it ("should parse a generic error", () =>
    {
        const error = new ShopifyError(genericResponse, {
            errors: "Test error message"
        });
        
        expect(error.errors["generic"].length).to.equal(1);
        expect(error.errors["generic"][0]).to.equal("Test error message");
    });
    
    it ("should parse an error with multiple properties", () =>
    {
        const error = new ShopifyError(genericResponse, {
            errors: {
                order: "must not be null",
                customer: [
                    "must contain an id",
                    "must contain a name",
                ]
            }
        });
        
        expect(error.errors["order"].length).to.equal(1);
        expect(error.errors["order"][0]).to.equal("must not be null");
        expect(error.errors["customer"].length).to.equal(2);
        expect(error.errors["customer"]).to.contain("must contain an id");
        expect(error.errors["customer"]).to.contain("must contain a name");
    })
})