/// <reference path="./../typings/index.d.ts" />
"use strict";
const chai_1 = require("chai");
const index_1 = require("../index");
var ShopifyError = index_1.Infrastructure.ShopifyError;
describe("ShopifyError", function () {
    const genericResponse = {
        ok: false,
        status: 422,
        statusText: "Unprocessable Entity",
        bodyUsed: true,
        size: "Unprocessable Entity".length,
        timeout: 100,
        type: "default",
        url: "",
    };
    const genericError = new ShopifyError(genericResponse, {
        errors: {
            order: "must not be null"
        }
    });
    it("should have an isShopifyPrime flag", () => {
        chai_1.expect(genericError.isShopifyPrime).to.equal(true);
    });
    it("should have a status code", () => {
        chai_1.expect(genericError.statusCode).to.equal(422);
    });
    it("should have a status text", () => {
        chai_1.expect(genericError.statusText).to.equal("Unprocessable Entity");
    });
    it("should have an errors object", () => {
        chai_1.expect(genericError.errors).to.not.be.null;
        chai_1.expect(genericError.errors["order"]).to.be.a("array");
        chai_1.expect(genericError.errors["order"].length).to.equal(1);
        chai_1.expect(genericError.errors["order"][0]).to.equal("must not be null");
    });
    it("should not fail when given an unknown body", () => {
        const error = new ShopifyError(genericResponse, {});
        chai_1.expect(error.isShopifyPrime).to.equal(true);
        chai_1.expect(error.statusText).to.equal("Unprocessable Entity");
        chai_1.expect(error.statusCode).to.equal(422);
        chai_1.expect(error.errors).to.not.be.null;
        chai_1.expect(Object.keys(error.errors).length).to.equal(0);
    });
    it("should parse a generic error", () => {
        const error = new ShopifyError(genericResponse, {
            errors: "Test error message"
        });
        chai_1.expect(error.errors["generic"].length).to.equal(1);
        chai_1.expect(error.errors["generic"][0]).to.equal("Test error message");
    });
    it("should parse an error with multiple properties", () => {
        const error = new ShopifyError(genericResponse, {
            errors: {
                order: "must not be null",
                customer: [
                    "must contain an id",
                    "must contain a name",
                ]
            }
        });
        chai_1.expect(error.errors["order"].length).to.equal(1);
        chai_1.expect(error.errors["order"][0]).to.equal("must not be null");
        chai_1.expect(error.errors["customer"].length).to.equal(2);
        chai_1.expect(error.errors["customer"]).to.contain("must contain an id");
        chai_1.expect(error.errors["customer"]).to.contain("must contain a name");
    });
});
