/// <reference path="./../typings/index.d.ts" />

declare var process: {env: any;};

const config: {[prop: string]: string} = process.env;

// Grab secret keys
const apiKey      = config["shopify-prime-apiKey"] || config["apiKey"] ;
const secretKey   = config["shopify-prime-secretKey"] || config["secretKey"]; 
const shopDomain  = config["shopify-prime-shopDomain"] || config["shopDomain"];
const accessToken = config["shopify-prime-accessToken"] || config["accessToken"];

if (!apiKey)
{
    throw new Error(`Expected 'apiKey' in process.env to exist.`);
}

if (!secretKey)
{
    throw new Error(`Expected 'secretKey' in process.env to exist.`);
}

if (!shopDomain)
{
    throw new Error(`Expected 'shopDomain' in process.env to exist.`);
}

if (!accessToken)
{
    throw new Error(`Expected 'accessToken' in process.env to exist.`);
}

export {apiKey, secretKey, shopDomain, accessToken};