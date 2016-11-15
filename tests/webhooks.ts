import { expect } from "chai";
import * as config from "./_utils";
import { Webhooks, Models } from "shopify-prime";
import Webhook = Models.Webhook;

describe("Webhooks", function () {
    this.timeout(30000);

    const service = new Webhooks(config.shopDomain, config.accessToken);
    const toBeDeleted: Webhook[] = [];
    function createWebhook() {
        const webhook: Webhook = {
            address: `http://requestb.in/100lt5e1/?webhook_id=${config.createGuid()}`,
            topic: "themes/publish",
        };

        return webhook;
    }

    afterEach((cb) => setTimeout(cb, 500));

    after((cb) => {
        const count = toBeDeleted.length;

        toBeDeleted.forEach(async (webhook) => await service.delete(webhook.id));

        console.log(`Deleted ${count} webhooks.`);

        // Wait 1 second to help empty the API rate limit bucket
        setTimeout(cb, 1000);
    })

    it("should delete a webhook", async () => {
        let error;

        try {
            const webhook = await service.create(createWebhook());

            await service.delete(webhook.id);
        }
        catch (e) {
            error = e;
        }

        expect(error).to.be.undefined;
    })

    it("should create a webhook", async () => {
        const webhook = await service.create(createWebhook());

        toBeDeleted.push(webhook);

        expect(webhook).to.not.be.null;
        expect(webhook.id).to.be.a("number");
        expect(webhook.topic).to.equal("themes/publish");
    })

    it("should get a webhook", async () => {
        let webhook = await service.create(createWebhook());

        toBeDeleted.push(webhook);

        webhook = await service.get(webhook.id);

        expect(webhook).to.not.be.null;
        expect(webhook.id).to.be.a("number");
        expect(webhook.topic).to.equal("themes/publish");
    })

    it("should get a webhook with only the topic field", async () => {
        let webhook = await service.create(createWebhook());

        toBeDeleted.push(webhook);

        webhook = await service.get(webhook.id, { fields: "topic" });

        expect(webhook).to.not.be.null;
        expect(Object.getOwnPropertyNames(webhook).length).to.equal(1);
        expect(webhook.topic).to.not.be.null;
    })

    it("should count webhooks", async () => {
        toBeDeleted.push(await service.create(createWebhook()));        

        const count = await service.count();

        expect(count).to.be.a("number");
        expect(count).to.be.at.least(1);
    })

    it("should list webhooks", async () => {
        toBeDeleted.push(await service.create(createWebhook()));        

        const list = await service.list();

        expect(list.length).to.be.at.least(1);
        expect(list[0]).to.not.be.null;
        expect(list[0].id).to.be.a("number");
        expect(list[0].address).to.be.a("string");
        expect(list[0].topic).to.equal("themes/publish");
    })

    it("should update a webhook", async () => {
        const newAddress = `http://requestb.in/100lt5e1/?webhook_id=${config.createGuid()}`;
        let webhook = await service.create(createWebhook());

        toBeDeleted.push(webhook);

        webhook = await service.update(webhook.id, { address: newAddress, topic: undefined })

        expect(webhook).to.not.be.null;
        expect(webhook.address.toLowerCase()).to.equal(newAddress.toLowerCase());
        expect(webhook.topic).to.equal("themes/publish");
    })
})