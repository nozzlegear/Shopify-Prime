/// <reference path="./typings/index.d.ts" />
"use strict";
function isAuthenticRequest() {
    throw new Error("Not Implemented");
}
exports.isAuthenticRequest = isAuthenticRequest;
function isAuthenticProxyRequest() {
    throw new Error("Not Implemented");
}
exports.isAuthenticProxyRequest = isAuthenticProxyRequest;
function isAuthenticWebhook() {
    throw new Error("Not Implemented");
}
exports.isAuthenticWebhook = isAuthenticWebhook;
function isValidShopifyUrl() {
    throw new Error("Not Implemented");
}
exports.isValidShopifyUrl = isValidShopifyUrl;
function buildAuthorizationUrl() {
    throw new Error("Not Implemented");
}
exports.buildAuthorizationUrl = buildAuthorizationUrl;
function authorize() {
    throw new Error("Not Implemented");
}
exports.authorize = authorize;
var base_service_1 = require("./modules/base-service");
exports.BaseService = base_service_1.BaseService;
var shopify_error_1 = require("./modules/shopify-error");
exports.ShopifyError = shopify_error_1.ShopifyError;
