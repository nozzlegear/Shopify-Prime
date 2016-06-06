# Shopify Prime

[![Build Status](https://travis-ci.org/nozzlegear/Shopify-Prime.svg?branch=master)](https://travis-ci.org/nozzlegear/Shopify-Prime)
[![npm](https://img.shields.io/npm/v/shopify-prime.svg?maxAge=3600)](https://npmjs.com/package/shopify-prime)
[![license](https://img.shields.io/github/license/nozzlegear/shopify-prime.svg?maxAge=3600)](https://github.com/nozzlegear/Shopify-Prime/blob/master/LICENSE)

Shopify Prime is a promise-driven NodeJS library built to help developers easily authenticate and make calls against the Shopify API. It was inspired by and borrows heavily from my other Shopify library, [ShopifySharp](https://github.com/nozzlegear/ShopifySharp).

Shopify Prime is complete with full TypeScript definitions for all classes, interfaces and functions, and provides many quality of life improvements over most other Node Shopify libs. Tired of using undocumented libs that haven't been updated in ages, expect you to know all of the URL paths, and are little more than a basic wrapper over Node's http library? Give Shopify Prime a try!

# Installation

Shopify Prime can be installed from [NPM](https://npmjs.com/package/shopify-prime):

```bash
npm install shopify-prime --save
```

After installation, import Shopify Prime via Node's require or ES6 import syntax:

```js
//via require
const Shopify = require("shopify-prime");

//via ES6
import * as Shopify from "shopify-prime";
```

Using TypeScript? The TypeScript compiler should automatically find Shopify Prime definitions for you when you install Shopify Prime via NPM. Just make sure your `tsconfig.json` has `moduleResolution` set to the default `"node"`.

## Async/await and promises

All Shopify Prime functions are implemented as async/awaitable promises. You'll need Node.js v4 and above to use Shopify Prime, as Node v3 and below don't support the generators needed for async/await.

Because async/await implements a promise-like interface in ES6, you can use the functions in this library in two different ways:

With async/await:

```js
//1. async/await
const shop = await shops.get();

//Do something with the shop
```

With promises:

```js
const shop = shops.get().then((shop) => {
    //Do something with the shop.
}); 
```

Both methods are supported and the results won't differ. The only difference is an `await`ed method will throw an error if the method fails, where a promise would just fail silently unless you use `.catch`.

For the sake of being concise, all examples in this doc will use async/await.

## A work-in-progress

This library is still pretty new. It currently suppports the following Shopify APIs:

- [OAuth authentication](#authorization-and-authentication).
- [Application charges (in-app purchases)](#one-time-application-charges)
- [Recurring application charges (subscriptions)](#recurring-application-charges-charge-shop-owners-to-use-your-app)
- [Shops](#shops)
- [Webhooks](#webhooks)

More functionality will be added each week until it reachs full parity with Shopify's REST API.

## Using Shopify Prime with a public Shopify app

**Note**: All instances of `shopAccessToken` in the examples below **do not refer to your Shopify API key**.
An access token is the token returned after authenticating and authorizing a Shopify app installation with a
real Shopify store.

All instances of `shopDomain` refer to your users' `*.myshopify.com` URL (although their custom domain should work too).

```js
import {Charges} from "shopify-prime";

const chargeService = new Charges(shopDomain, shopAccessToken);
```

## Using Shopify Prime with a private Shopify app

Shopify Prime should work out of the box with your private Shopify application, all you need to do is replace the `shopAccessToken` with your private app's password when initializing a service:

```js
import {Orders} from "shopify-prime";

const orderService = new Orders(shopDomain, privateAppPassword)
```

If you just need an access token for a private Shopify app, or for running the tests in this library, refer to the **Tests** section below.

# Authorization and authentication

### Ensure a given URL is a valid Shopify URL

This is a convenience method that validates whether a given URL is a valid Shopify shop. It's great for ensuring
you don't redirect a user to an incorrect URL when you need them to authorize your app installation, and is
ideally used in conjuction with `.buildAuthorizationUrl`.

Shopify Prime will call the given URL and check for an `X-ShopId` header in the response. That header is present on all Shopify shops and its existence signals that the URL is indeed a Shopify URL.

**Note**, however, that this feature is undocumented by Shopify and may break at any time. Use at your own discretion.

```js
import {isValidShopifyDomain} from "shopify-prime";

const urlFromUser = "https://example.myshopify.com";
const isValidUrl = await isValidMyShopifyDomain(urlFromUser).
```

### Build an authorization URL

Redirect your users to this authorization URL, where they'll be prompted to install your app to their Shopify store.

```js
import {buildAuthorizationUrl} from "shopify-prime";

//This is the user's store URL.
const usersShopifyUrl = "https://example.myshopify.com";

//An optional URL to redirect the user to after they've confirmed app installation.
//If you don't specify a redirect url, Shopify will redirect to your app's default URL.
const redirectUrl = "https://example.com/my/redirect/url";

//An array of the Shopify access scopes your application needs to run.
const permissions = ["read_orders", "write_orders"];

//Build the URL and send your user to it where they'll be prompted to install your app.
const authUrl = buildAuthorizationUrl(scopes, usersShopifyurl, yourShopifyApiKey, redirect);
```

### Authorize an installation and generate an access token

Once you've sent a user to the authorization URL and they've confirmed your app installation, they'll be redirected
back to your application at either the default app URL, or the redirect URL you passed in when building the
authorization URL.

The access token you receive after authorizing should be stored in your database. You'll need it to access the
shop's resources (e.g. orders, customers, fulfillments, etc.)

```js
import {authorize} from "shopify-prime";

// The querystring will have several parameters you need for authorization. 
// Refer to your server framework docs for details on getting a request querystring.
const code = request.QueryString["code"];
const shopUrl = request.QueryString["shop"];

const accessToken = await authorize(code, shopUrl, shopifyApiKey, shopifySecretKey)
```

### Determine if a request is authentic

Any (non-webhook, non-proxy-page) request coming from Shopify will have a querystring paramater called 'hmac' that you can use
to verify that the request is authentic. This hmac value is a hash of all querystring parameters and your app's
secret key.

Pass the entire querystring to `.isAuthenticRequest` to verify the request.

```js
import {isAuthenticRequest} from "shopify-prime";

const qs = request.QueryString;
const isAuthentic = await isAuthenticRequest(qs, shopifySecretKey);

if (isAuthentic)
{
    //Request is authentic.
}
else
{
    //Request is not authentic and should not be acted on.
}
```

### Determine if a proxy page request is authentic

Nearly identical to authenticating normal requests, a proxy page request only differs in the way the querystring is formatted to calculate the hmac signature. All proxy page requests coming from Shopify will have a querystring parameter named `signature` that you can use to verify the request. This signature is a hash of all querystring parameters and your app's secret key.

```js
import {isAuthenticProxyRequest} from "shopify-prime";

const qs = request.QueryString;
const isAuthentic = await isAuthenticProxyRequest(qs, shopifySecretKey);

if (isAuthentic)
{
    //Request is authentic.
}
else
{
    //Request is not authentic and should not be acted on.
}
```

### Determine if a webhook request is authentic

Any webhook request coming from Shopify will have a header called 'X-Shopify-Hmac-SHA256' that you can use
to verify that the webhook is authentic. The header is a hash of the entire request body and your app's
secret key.

Pass that header and the request body string to `.isAuthenticWebhook` to verify the request.

```js
import {isAuthenticWebhook} from "shopify-prime";

const hmacHeader = request.QueryString["X-Shopify-Hmac-SHA256"];
const body = request.body.toString();
const isAuthentic = await isAuthenticWebhook(hmacHeader, body, shopifySecretKey);

if (isAuthentic)
{
    //Webhook is authentic.
}
else
{
    //Webhook is not authentic and should not be acted on.
}
```

You can also pass in the request body as a string, rather than using the input stream. However, the request
body string needs to be identical to the way it was sent from Shopify. If it has been modified, the
verification will fail.

## Recurring Application Charges (monthly subscriptions)

The Shopify billing API lets you create a recurring charge on a shop owner's account, letting them pay you
on a monthly basis for using your application. 

### Create a recurring charge

```ts
import {RecurringCharges, RecurringCharge} from "shopify-prime";

const service = new RecurringCharges(shopDomain, shopAccessToken);
let charge: RecurringCharge = {
    Name = "Lorem Ipsum Plan",
    Price = 12.34,
    Test = true,   //Marks this charge as a test, meaning it won't charge the shop owner.
    TrialDays = 21 //Don't charge the user for 21 days
}

charge = await service.create(charge);
```

### Retrieve a recurring charge

```ts
import {RecurringCharges} from "shopify-prime";

const service = new RecurringCharges(shopDomain, shopAccessToken);
const charge = await service.get(chargeId);
```

### Listing recurring charges

```ts
import {RecurringCharges} from "shopify-prime";

const service = new RecurringCharges(shopDomain, shopAccessToken);
const list: RecurringCharge[] = await service.list();
```

### Activating a charge

Creating a charge does not actually charge the shop owner or even start their free trial. You need to
send them to the charge's `confirmation_url`, have them accept the charge, then activate it.

```ts
import {RecurringCharges} from "shopify-prime";

const service = new RecurringCharges(shopDomain, shopAccessToken);

await service.activate(chargeId);
```

### Deleting a charge

Charges cannot be deleted unless they've been activated. Shopify automatically deletes pending charges
after 48 hours pass without activation.

```ts
import {RecurringCharges, RecurringCharge} from "shopify-prime";

const service = new RecurringCharges(shopDomain, shopAccessToken);

await service.delete(chargeId);
```

## One-time application charges

Just like with the above recurring charges, the Shopify billing API lets you create a one-time application
charge on the shop owner's account. One-time charges cannot be deleted.

### Create a one-time charge

```ts
import {Charges, Charge} from "shopify-prime";

const service = new Charges(shopDomain, shopAccessToken);
let charge: Charge = {
    Name = "Lorem Ipsum Charge",
    Price = 12.34,
    Test = true, //Marks this charge as a test, meaning it won't charge the shop owner.
}

charge = await service.create(charge);
```

### Retrieve a one-time charge

```ts
import {Charges} from "shopify-prime";

const service = new Charges(shopDomain, shopAccessToken);
const charge = await service.get(chargeId);
```

### Listing one-time charges

```ts
import {Charges, Charge} from "shopify-prime";

const service = new Charges(shopDomain, shopAccessToken);
const list: Charge[] = service.list();
```

### Activating a charge

Just like recurring charges, creating a one-time charge does not actually charge the shop owner. You need to
send them to the charge's `ConfirmationUrl`, have them accept the charge, then activate it.

```ts
import {Charges} from "shopify-prime";

const service = new Charges(shopDomain, shopAccessToken);

await service.activate(chargeId);
```

## Shops

### Retrieving shop information

```js
import {Shops} from "shopify-prime";

const service = new Shops(shopDomain, shopAccessToken);
const shop = await service.get();
```

### Uninstalling your app

In cases where user intervention is not required, you can send a request to a Shopify shop to force it to uninstall your application. After sending this request, the shop access token will be immediately revoked and invalidated.

Uninstalling an application is an irreversible operation. Be entirely sure that you no longer need to make API calls for the shop in which the application has been installed.

Uninstalling an application also performs various cleanup tasks within Shopify. Registered Webhooks, ScriptTags and App Links will be destroyed as part of this operation. Also if an application is uninstalled during key rotation, both the old and new Access Tokens will be rendered useless.

```js
import {Shops} from "shopify-prime";

const service = new Shops(shopDomain, shopAccessToken);

await shop.forceUninstallApp();
```

## Webhooks

### Creating a webhook

```js
import {Webhooks, Webhook} from "shopify-prime";

const service = new Webhooks(shopDomain, shopAccessToken);
const webhook: Webhook = {
    address = "https://my.webhook.url.com/path",
    topic = "themes/publish",
};

webhook = await service.create(webhook);
```

### Retrieving a webhook

```js
import {Webhooks, Webhook} from "shopify-prime";

const service = new Webhooks(shopDomain, shopAccessToken);
const webhook = await service.get(webhookId);
```

### Updating a webhook

```js
import {Webhooks, Webhook} from "shopify-prime";

const service = new Webhooks(shopDomain, shopAccessToken);
const webhook = await service.update(webhookId, {
    address: "https://my.webhook.url.com/new/path"
});

console.log(webhook.address); // "https://my.webhook.url.com/new/path"
```

### Deleting a webhook

```js
import {Webhooks, Webhook} from "shopify-prime";

const service = new Webhooks(shopDomain, shopAccessToken);

await service.delete(webhookId);
```

### Counting webhooks

```js
import {Webhooks, Webhook} from "shopify-prime";

const service = new Webhooks(shopDomain, shopAccessToken);
const count = await service.count();
```

### Listing webhooks

```js
import {Webhooks, Webhook} from "shopify-prime";

const service = new Webhooks(shopDomain, shopAccessToken);
const webhooks: Webhook[] = await service.list();
```
