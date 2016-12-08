import { expect } from "chai";
import * as config from "./_utils";
import { ScriptTags, Models } from "shopify-prime";
import ScriptTag = Models.ScriptTag;

describe("Script Tags", function () {
    this.timeout(30000);

    const service = new ScriptTags(config.shopDomain, config.accessToken);
    const toBeDeleted: ScriptTag[] = [];
    function createTag() {
        const tag: ScriptTag = {
            src: `https://localhost:3000/scripts/${new Date().getMilliseconds()}.js`,
            event: "onload",
            display_scope: "all"
        }

        return tag;
    }

    afterEach((cb) => setTimeout(cb, 500));

    after((cb) => {
        const count = toBeDeleted.length;

        toBeDeleted.forEach(async (tag) => await service.delete(tag.id));

        console.log(`Deleted ${count} script tags.`);

        // Wait 1 second to help empty the API rate limit bucket
        setTimeout(cb, 1000);
    })

    it("should delete a script tag", async () => {
        let error;

        try {
            const tag = await service.create(createTag());

            await service.delete(tag.id);
        }
        catch (e) {
            console.log("Error deleting tag", e);

            error = e;
        }

        expect(error).to.be.undefined;
    })

    it("should create a script tag", async () => {
        const tag = await service.create(createTag());

        toBeDeleted.push(tag);

        expect(tag).to.not.be.null;
        expect(tag).to.not.be.undefined;
        expect(tag.id).to.be.a("number");
        expect(tag.src).to.match(/^https:\/\/localhost:3000\/scripts\//i);
        expect(tag.created_at).to.be.a("string");
        expect(tag.updated_at).to.be.a("string");
        expect(tag.event).to.equal("onload");
    })

    it("should get a script tag", async () => {
        let tag = await service.create(createTag());

        toBeDeleted.push(tag);

        tag = await service.get(tag.id);

        expect(tag).to.not.be.null;
        expect(tag).to.not.be.undefined;
    });

    it("should get a tag with only the src field", async () => {
        let tag = await service.create(createTag());

        toBeDeleted.push(tag);

        tag = await service.get(tag.id, { fields: "src" });

        expect(tag).to.not.be.null;
        expect(tag).to.not.be.undefined;
        expect(Object.getOwnPropertyNames(tag).length).to.equal(1);
        expect(tag.src).to.be.a("string");
        expect(tag.created_at).to.be.undefined;
    })

    it("should count script tags", async () => {
        for (let i = 0; i < 3; i++) {
            toBeDeleted.push(await service.create(createTag()));
        }

        const count = await service.count();

        expect(count).to.be.a("number");
        expect(count).to.be.at.least(3);
    })

    it("should list script tags", async () => {
        for (let i = 0; i < 3; i++) {
            toBeDeleted.push(await service.create(createTag()));
        }

        const list = await service.list();

        expect(list.length).to.be.at.least(3);

        const tag = list[0];

        expect(tag).to.not.be.null;
        expect(tag).to.not.be.undefined;
        expect(tag.id).to.be.a("number");
        expect(tag.src).to.match(/^https:\/\/localhost:3000\/scripts\//i);
        expect(tag.created_at).to.be.a("string");
        expect(tag.updated_at).to.be.a("string");
        expect(tag.event).to.equal("onload");
    })

    it("should update a script tag", async () => {
        const newSrc = "https://localhost:3000/scripts/my-updated-src.js";
        let tag = await service.create(createTag());

        toBeDeleted.push(tag);

        tag = await service.update(tag.id, { src: newSrc });

        expect(tag).to.not.be.null;
        expect(tag).to.not.be.undefined;
        expect(tag.src).to.equal(newSrc);
    });
});