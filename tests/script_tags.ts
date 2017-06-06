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
import { Config, Expect } from './_utils';

@TestFixture("ScriptTag Tests") 
export class ScriptTagTests {
    private service = new Prime.ScriptTags(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.ScriptTag[] = [];

    @AsyncTeardownFixture
    private async teardownAsync() {
        await Promise.all(this.created.map(created => this.service.delete(created.id)));

        inspect(`Deleted ${this.created.length} objects during teardown.`);
    }

    private async create(scheduleForDeletion = true) {
        const obj = await this.service.create({
            src: `https://localhost:3000/scripts/${Date.now()}.js`,
            event: "onload",
            display_scope: "all"   
        });

        if (scheduleForDeletion) {
            this.created.push(obj);
        };

        return obj;
    }

    @AsyncTest("should delete a script tag")
    @Timeout(5000)
    public async Test1() {
        const created = await this.create(false);
        let error;

        try {
            await this.service.delete(created.id);
        }
        catch (e) {
            inspect("Error deleting tag", e);

            error = e;

            this.created.push(created);
        }

        Expect(error).toBeNullOrUndefined();
    }

    @AsyncTest("should create a script tag")
    @Timeout(5000)
    public async Test2() {
        const tag = await this.create();

        Expect(tag.id).toBeType("number");
        Expect(tag.src).toMatch(/^https:\/\/localhost:3000\/scripts\//i);
        Expect(tag.created_at).toBeType("string");
        Expect(tag.updated_at).toBeType("string");
        Expect(tag.event).toEqual("onload");
    }

    @AsyncTest("should get a script tag")
    @Timeout(5000)
    public async Test3() {
        let tag = await this.create();

        tag = await this.service.get(tag.id);

        Expect(tag).not.toBeNull();
        Expect(tag).not.toBeNullOrUndefined();
    }

    @AsyncTest("should get a tag with only the src field")
    @Timeout(5000)
    public async Test4() {
        let tag = await this.create();

        tag = await this.service.get(tag.id, { fields: "src" });

        Expect(tag).not.toBeNull();
        Expect(tag).not.toBeNullOrUndefined();
        Expect(Object.getOwnPropertyNames(tag).length).toEqual(1);
        Expect(tag.src).toBeType("string");
        Expect(tag.created_at).toBeNullOrUndefined();
    }

    @AsyncTest("should count script tags")
    @Timeout(5000)
    public async Test5() {
        const count = await this.service.count();

        Expect(count).toBeType("number");
        Expect(count).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should list script tags")
    @Timeout(5000)
    public async Test6() {
        const list = await this.service.list();

        Expect(list.length).toBeGreaterThanOrEqualTo(1);
        Expect(list).itemsToPassValidator<Prime.Models.ScriptTag>(tag => {
            Expect(tag.id).toBeType("number");
            Expect(tag.src).toMatch(/^https:\/\/localhost:3000\/scripts\//i);
            Expect(tag.created_at).toBeType("string");
            Expect(tag.updated_at).toBeType("string");
            Expect(tag.event).toEqual("onload");
        });
    }

    @AsyncTest("should update a script tag")
    @Timeout(5000)
    public async Test7() {
        const newSrc = "https://localhost:3000/scripts/my-updated-src.js";
        let tag = await this.create();

        tag = await this.service.update(tag.id, { src: newSrc });

        Expect(tag.src).toEqual(newSrc);
    }
}