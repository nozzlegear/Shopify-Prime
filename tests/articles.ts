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

@TestFixture("Article Tests")
export class ArticleTests {
    private service = new Prime.Articles(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.Article[] = [];

    private blogId: number;

    @AsyncSetupFixture
    private async setupAsync() {
        const blogs = await new Prime.Blogs(Config.shopDomain, Config.accessToken).list();

        this.blogId = blogs[0].id;
    }

    @AsyncTeardownFixture
    private async teardownAsync() {
        await Promise.all(this.created.map(created => this.service.delete(this.blogId, created.id)));

        inspect(`Deleted ${this.created.length} articles during teardown.`);

        // Wait 2 seconds after all tests to let the API rate limit bucket empty.
        inspect("Waiting 2 seconds to let API rate limit empty.")
        
        await new Promise(resolve => setTimeout(() => {
            inspect("Continuing.")
            resolve();
        }, 2000));
    }

    private async create(scheduleForDeletion = true) {
        const obj = await this.service.create(this.blogId, {
            title: "My article title - " + Date.now(),
            author: "John Smith",
            tags: "This Post, Has Been Tagged",
            body_html: "<h1>I like articles</h1>\n<p><strong>Yea</strong>, I like posting them through <span class=\"caps\">REST</span>.</p>",
            image: {
                attachment: "R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\n"
            }
        });

        if (scheduleForDeletion) {
            this.created.push(obj);
        }

        return obj;
    }

    @AsyncTest("should create an article")
    @Timeout(5000)
    public async CreatesArticles() {
        const article = await this.create();

        Expect(article).toBeType("object");
        Expect(article.title).toContain("My article title - ");
        Expect(article.tags).toBeType("string");
        Expect(article.body_html).toEqual("<h1>I like articles</h1>\n<p><strong>Yea</strong>, I like posting them through <span class=\"caps\">REST</span>.</p>");
        Expect(article.image.src).toBeType('string');
    }

    @AsyncTest("should update an article")
    @Timeout(5000)
    public async UpdatesArticles() {
        const id = (await this.create()).id;
        const title = "My updated title";
        const article = await this.service.update(this.blogId, id, { title });

        Expect(article).toBeType("object");
        Expect(article.title).toEqual(title);
        Expect(article.tags).toBeType("string");
        Expect(article.body_html).toEqual("<h1>I like articles</h1>\n<p><strong>Yea</strong>, I like posting them through <span class=\"caps\">REST</span>.</p>");
        Expect(article.image.src).toBeType('string');
    }

    @AsyncTest("should get an article")
    @Timeout(5000)
    public async GetsArticles() {
        const id = (await this.create()).id;
        const article = await this.service.get(this.blogId, id);

        Expect(article).toBeType("object");
        Expect(article.title).toContain("My article title - ");
        Expect(article.tags).toBeType("string");
        Expect(article.body_html).toEqual("<h1>I like articles</h1>\n<p><strong>Yea</strong>, I like posting them through <span class=\"caps\">REST</span>.</p>");
        Expect(article.image.src).toBeType('string');
    }

    @AsyncTest("should list articles")
    @Timeout(5000)
    public async ListsArticles() {
        const articles = await this.service.list(this.blogId);

        Expect(articles).toBeAnArray();
    }

    @AsyncTest("should count articles")
    @Timeout(5000)
    public async CountsArticles() {
        const count = await this.service.count(this.blogId);

        Expect(count).toBeType("number");
        Expect(count).toBeGreaterThanOrEqualTo(0);
    }

    @AsyncTest("should delete an article")
    @Timeout(5000)
    public async DeletesArticles() {
        const id = (await this.create(false)).id;
        let error;

        try {
            await this.service.delete(this.blogId, id);
        } catch (e) {
            error = e;
        }

        Expect(error).toBeNullOrUndefined();
    }

    @AsyncTest("should list authors")
    @Timeout(5000)
    public async ListsAuthors() {
        const authors = await this.service.listAuthors();

        Expect(authors).toBeAnArray();
    }

    @AsyncTest("should list tags")
    @Timeout(5000)
    public async ListsTags() {
        const tags = await this.service.listTags();

        Expect(tags).toBeAnArray();
    }

    @AsyncTest("should list tags for a blog")
    @Timeout(5000)
    public async ListsTagsForBlog() {
        const tags = await this.service.listTagsForBlog(this.blogId);

        Expect(tags).toBeAnArray();
    }
}