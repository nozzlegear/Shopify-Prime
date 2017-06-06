import * as Prime from '../';
import inspect from 'logspect/bin';
import {
    AsyncSetupFixture,
    AsyncTeardownFixture,
    AsyncTest,
    IgnoreTest,
    TestFixture,
    Timeout
    } from 'alsatian';
import { Config, createGuid, Expect } from './test_utils';

@TestFixture("Webhook Tests") 
export class WebhookTests {
    private service = new Prime.Webhooks(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.Webhook[] = [];

    @AsyncTeardownFixture
    private async teardownAsync() {
        await Promise.all(this.created.map(created => this.service.delete(created.id)));

        inspect(`Deleted ${this.created.length} objects during teardown.`);
    }

    private async create(scheduleForDeletion = true) {
        const obj = await this.service.create({
            address: `http://requestb.in/100lt5e1/?webhook_id=${createGuid()}`,
            topic: "themes/publish",
        });

        if (scheduleForDeletion) {
            this.created.push(obj);
        };

        return obj;
    }

    @AsyncTest("should delete a webhook")
    @Timeout(5000)
    public async Test1() {
        const webhook = await this.create(false);
        let error;

        try {
            await this.service.delete(webhook.id);
        }
        catch (e) {
            error = e;
        }

        Expect(error).toBeNullOrUndefined();
    }

    @AsyncTest("should create a webhook")
    @Timeout(5000)
    public async Test2() {
        const webhook = await this.create();

        Expect(webhook.id).toBeType("number");
        Expect(webhook.topic).toEqual("themes/publish");
    }

    @AsyncTest("should get a webhook")
    @Timeout(5000)
    public async Test3() {
        let webhook = await this.create();
        webhook = await this.service.get(webhook.id);

        Expect(webhook).not.toBeNull();
        Expect(webhook.id).toBeType("number");
        Expect(webhook.topic).toEqual("themes/publish");
    }

    @AsyncTest("should get a webhook with only the topic field")
    @Timeout(5000)
    public async Test4() {
        let webhook = await this.create();
        webhook = await this.service.get(webhook.id, { fields: "topic" });

        Expect(webhook).not.toBeNull();
        Expect(Object.getOwnPropertyNames(webhook).length).toEqual(1);
        Expect(webhook.topic).not.toBeNull();
    }

    @AsyncTest("should count webhooks")
    @Timeout(5000)
    public async Test5() {
        const count = await this.service.count();

        Expect(count).toBeType("number");
        Expect(count).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should list webhooks")
    @Timeout(5000)
    public async Test6() {
        const list = await this.service.list();

        Expect(list.length).toBeGreaterThanOrEqualTo(1);
        Expect(list[0]).not.toBeNull();
        Expect(list[0].id).toBeType("number");
        Expect(list[0].address).toBeType("string");
        Expect(list[0].topic).toEqual("themes/publish");
    }

    @AsyncTest("should update a webhook")
    @Timeout(5000)
    public async Test7() {
        const newAddress = `http://requestb.in/100lt5e1/?webhook_id=${createGuid()}`;
        let webhook = await this.create();
        webhook = await this.service.update(webhook.id, { address: newAddress, topic: undefined })

        Expect(webhook).not.toBeNull();
        Expect(webhook.address.toLowerCase()).toEqual(newAddress.toLowerCase());
        Expect(webhook.topic).toEqual("themes/publish");
    }
}