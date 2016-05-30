/// <reference path="./../typings/index.d.ts" />

declare var require: any;

const config      = require("../tests.private.json") as {[prop: string] : string};
const apiKey      = config["apiKey"];
const secretKey   = config["secretKey"]; 
const shopDomain  = config["shopDomain"];
const accessToken = config["accessToken"];

if (!apiKey)
{
    throw new Error("Expected 'apiKey' in tests.private.json to exist.");
}

if (!secretKey)
{
    throw new Error("Expected 'secretKey' in tests.private.json to exist.");
}

if (!shopDomain)
{
    throw new Error("Expected 'shopDomain' in tests.private.json to exist.");
}

if (!accessToken)
{
    throw new Error("Expected 'accessToken' in tests.private.json to exist.");
}

export {apiKey, secretKey, shopDomain, accessToken};