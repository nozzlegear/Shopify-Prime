/// <reference path="./../typings/index.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const chai_1 = require("chai");
const config = require("./_utils");
const index_1 = require("../index");
describe("Webhooks", function () {
    this.timeout(30000);
    const service = new index_1.Webhooks(config.shopDomain, config.accessToken);
    const toBeDeleted = [];
    function createWebhook() {
        const webhook = {
            address: `http://requestb.in/100lt5e1/?webhook_id=${config.createGuid()}`,
            topic: "themes/publish",
        };
        return webhook;
    }
    after(() => {
        const count = toBeDeleted.length;
        toBeDeleted.forEach((webhook) => __awaiter(this, void 0, void 0, function* () { return yield service.delete(webhook.id); }));
        console.log(`Deleted ${count} webhooks.`);
    });
    it("should delete a webhook", () => __awaiter(this, void 0, void 0, function* () {
        let error;
        try {
            const webhook = yield service.create(createWebhook());
            service.delete(webhook.id);
        }
        catch (e) {
            error = e;
        }
        chai_1.expect(error).to.be.undefined;
    }));
    it("should create a webhook", () => __awaiter(this, void 0, void 0, function* () {
        const webhook = yield service.create(createWebhook());
        toBeDeleted.push(webhook);
        chai_1.expect(webhook).to.not.be.null;
        chai_1.expect(webhook.id).to.be.a("number");
        chai_1.expect(webhook.topic).to.equal("themes/publish");
    }));
    it("should get a webhook", () => __awaiter(this, void 0, void 0, function* () {
        let webhook = yield service.create(createWebhook());
        toBeDeleted.push(webhook);
        webhook = yield service.get(webhook.id);
        chai_1.expect(webhook).to.not.be.null;
        chai_1.expect(webhook.id).to.be.a("number");
        chai_1.expect(webhook.topic).to.equal("themes/publish");
    }));
    it("should get a webhook with only the topic field", () => __awaiter(this, void 0, void 0, function* () {
        let webhook = yield service.create(createWebhook());
        toBeDeleted.push(webhook);
        webhook = yield service.get(webhook.id, { fields: ["topic"] });
        chai_1.expect(webhook).to.not.be.null;
        chai_1.expect(Object.getOwnPropertyNames(webhook).length).to.equal(1);
        chai_1.expect(webhook.topic).to.not.be.null;
    }));
    it("should count webhooks", () => __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < 3; i++) {
            toBeDeleted.push(yield service.create(createWebhook()));
        }
        const count = yield service.count();
        chai_1.expect(count).to.be.a("number");
        chai_1.expect(count).to.be.at.least(3);
    }));
    it("should list webhooks", () => __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < 3; i++) {
            toBeDeleted.push(yield service.create(createWebhook()));
        }
        const list = yield service.list();
        chai_1.expect(list.length).to.be.at.least(3);
        chai_1.expect(list[0]).to.not.be.null;
        chai_1.expect(list[0].id).to.be.a("number");
        chai_1.expect(list[0].address).to.be.a("string");
        chai_1.expect(list[0].topic).to.equal("themes/publish");
    }));
    it("should update a webhook", () => __awaiter(this, void 0, void 0, function* () {
        const newAddress = `http://requestb.in/100lt5e1/?webhook_id=${config.createGuid()}`;
        let webhook = yield service.create(createWebhook());
        toBeDeleted.push(webhook);
        webhook = yield service.update(webhook.id, { address: newAddress, topic: undefined });
        chai_1.expect(webhook).to.not.be.null;
        chai_1.expect(webhook.address.toLowerCase()).to.equal(newAddress.toLowerCase());
        chai_1.expect(webhook.topic).to.equal("themes/publish");
    }));
});
