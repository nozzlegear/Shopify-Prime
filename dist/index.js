// Exported definitions should never contain triple-slash references: 
// https://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html
"use strict";
const Enums = require("./enums");
exports.Enums = Enums;
const Options = require("./options");
exports.Options = Options;
const Infrastructure = require("./infrastructure");
exports.Infrastructure = Infrastructure;
var shops_1 = require("./modules/shops");
exports.Shops = shops_1.Shops;
var charges_1 = require("./modules/charges");
exports.Charges = charges_1.Charges;
var webhooks_1 = require("./modules/webhooks");
exports.Webhooks = webhooks_1.Webhooks;
var script_tags_1 = require("./modules/script_tags");
exports.ScriptTags = script_tags_1.ScriptTags;
var usage_charges_1 = require("./modules/usage_charges");
exports.UsageCharges = usage_charges_1.UsageCharges;
var recurring_charges_1 = require("./modules/recurring_charges");
exports.RecurringCharges = recurring_charges_1.RecurringCharges;
// Export auth functions at the top level
var auth_1 = require("./modules/auth");
exports.authorize = auth_1.authorize;
exports.buildAuthorizationUrl = auth_1.buildAuthorizationUrl;
exports.isAuthenticProxyRequest = auth_1.isAuthenticProxyRequest;
exports.isAuthenticRequest = auth_1.isAuthenticRequest;
exports.isAuthenticWebhook = auth_1.isAuthenticWebhook;
exports.isValidShopifyDomain = auth_1.isValidShopifyDomain;
