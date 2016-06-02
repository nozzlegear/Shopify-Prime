/// <reference path="./../typings/index.d.ts" />

import {expect} from "chai";
import {BaseService} from "../dist";

describe("BaseService", function ()
{
    it ("should set new credentials", () =>
    {
         const service = new BaseService("first.myshopify.com", "abcdefg", "orders");
         
         service.setCredentials("second.myshopify.com", "123456");
         
         expect(service["accessToken"]).to.equal("123456");
         expect(service["shopDomain"]).to.equal("second.myshopify.com");
    });
})