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
describe("Script Tags", function () {
    this.timeout(30000);
    const service = new index_1.ScriptTags(config.shopDomain, config.accessToken);
    const toBeDeleted = [];
    function createTag() {
        const tag = {
            src: `https://localhost:3000/scripts/${new Date().getMilliseconds()}.js`,
            event: "onload",
        };
        return tag;
    }
    after(() => {
        const count = toBeDeleted.length;
        toBeDeleted.forEach((tag) => __awaiter(this, void 0, void 0, function* () { return yield service.delete(tag.id); }));
        console.log(`Deleted ${count} script tags.`);
    });
    it("should delete a script tag", () => __awaiter(this, void 0, void 0, function* () {
        let error;
        try {
            const tag = yield service.create(createTag());
            yield service.delete(tag.id);
        }
        catch (e) {
            console.log("Error deleting tag", e);
            error = e;
        }
        chai_1.expect(error).to.be.undefined;
    }));
    it("should create a script tag", () => __awaiter(this, void 0, void 0, function* () {
        const tag = yield service.create(createTag());
        toBeDeleted.push(tag);
        chai_1.expect(tag).to.not.be.null;
        chai_1.expect(tag).to.not.be.undefined;
        chai_1.expect(tag.id).to.be.a("number");
        chai_1.expect(tag.src).to.match(/^https:\/\/localhost:3000\/scripts\//i);
        chai_1.expect(tag.created_at).to.be.a("string");
        chai_1.expect(tag.updated_at).to.be.a("string");
        chai_1.expect(tag.event).to.equal("onload");
    }));
    it("should get a script tag", () => __awaiter(this, void 0, void 0, function* () {
        let tag = yield service.create(createTag());
        toBeDeleted.push(tag);
        tag = yield service.get(tag.id);
        chai_1.expect(tag).to.not.be.null;
        chai_1.expect(tag).to.not.be.undefined;
    }));
    it("should get a tag with only the src field", () => __awaiter(this, void 0, void 0, function* () {
        let tag = yield service.create(createTag());
        toBeDeleted.push(tag);
        tag = yield service.get(tag.id, { fields: ["src"] });
        chai_1.expect(tag).to.not.be.null;
        chai_1.expect(tag).to.not.be.undefined;
        chai_1.expect(Object.getOwnPropertyNames(tag).length).to.equal(1);
        chai_1.expect(tag.src).to.be.a("string");
        chai_1.expect(tag.created_at).to.be.undefined;
    }));
    it("should count script tags", () => __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 3; i++) {
            toBeDeleted.push(yield service.create(createTag()));
        }
        const count = yield service.count();
        chai_1.expect(count).to.be.a("number");
        chai_1.expect(count).to.be.at.least(3);
    }));
    it("should list script tags", () => __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 3; i++) {
            toBeDeleted.push(yield service.create(createTag()));
        }
        const list = yield service.list();
        chai_1.expect(list.length).to.be.at.least(3);
        const tag = list[0];
        chai_1.expect(tag).to.not.be.null;
        chai_1.expect(tag).to.not.be.undefined;
        chai_1.expect(tag.id).to.be.a("number");
        chai_1.expect(tag.src).to.match(/^https:\/\/localhost:3000\/scripts\//i);
        chai_1.expect(tag.created_at).to.be.a("string");
        chai_1.expect(tag.updated_at).to.be.a("string");
        chai_1.expect(tag.event).to.equal("onload");
    }));
    it("should update a script tag", () => __awaiter(this, void 0, void 0, function* () {
        const newSrc = "https://localhost:3000/scripts/my-updated-src.js";
        let tag = yield service.create(createTag());
        toBeDeleted.push(tag);
        tag = yield service.update(tag.id, { src: newSrc });
        chai_1.expect(tag).to.not.be.null;
        chai_1.expect(tag).to.not.be.undefined;
        chai_1.expect(tag.src).to.equal(newSrc);
    }));
});
