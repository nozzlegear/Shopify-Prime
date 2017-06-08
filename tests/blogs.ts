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
import { Config, Expect } from './test_utils';

@TestFixture("Blog tests")
export class BlogTests {
    private service = new Prime.Blogs(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.Blog[] = [];

    @AsyncTeardownFixture
    private async teardownAsync() {
        await Promise.all(this.created.map(created => this.service.delete(created.id)));

        inspect(`Deleted ${this.created.length} objects during teardown.`);

        // Wait 2 seconds after all tests to let the API rate limit bucket empty.
        inspect("Waiting 2 seconds to let API rate limit empty.")
        
        await new Promise(resolve => setTimeout(() => {
            inspect("Continuing.")
            resolve();
        }, 3000));
    }

    private async create(scheduleForDeletion = true) {
        const obj = await this.service.create({
            title: "Shopify Prime Test Blog - " + Date.now(),
            commentable: "moderate"
        });

        if (scheduleForDeletion) {
            this.created.push(obj);
        };

        return obj;
    }

    @AsyncTest("should create a blog")
    @Timeout(5000)
    public async Test1() {
        const blog = await this.create();

        Expect(blog).toBeType("object");
        Expect(blog.title).toContain("Shopify Prime Test Blog - ");
        Expect(blog.commentable).toEqual("moderate");        
    }

    @AsyncTest("should get a blog")
    @Timeout(5000)
    public async Test2() {
        const id = (await this.create()).id;
        const blog = await this.service.get(id);

        Expect(blog).toBeType("object");
        Expect(blog.title).toContain("Shopify Prime Test Blog - ");
        Expect(blog.commentable).toEqual("moderate");
    }

    @AsyncTest("should update a blog")
    @Timeout(5000)
    public async Test3() {
        const title = "My Updated Title";
        const id = (await this.create()).id;
        const blog = await this.service.update(id, {title});

        Expect(blog).toBeType("object");
        Expect(blog.title).toEqual(title);
        Expect(blog.commentable).toEqual("moderate");
    }

    @AsyncTest("should list blogs")
    @Timeout(5000)
    public async Test4() {
        const list = await this.service.list();

        Expect(list).toBeAnArray();
    }

    @AsyncTest("should count blogs")
    @Timeout(5000)
    public async Test5() {
        const count = await this.service.count();

        Expect(count).toBeType("number");
        Expect(count).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should delete a blog")
    @Timeout(5000)
    public async Test6() {
        const blog = await this.create(false);
        let error;

        try {
            await this.service.delete(blog.id);
        } catch (e) {
            error = e;
        }

        Expect(error).toBeNullOrUndefined;
    }
}