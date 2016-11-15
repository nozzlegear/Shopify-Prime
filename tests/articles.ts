import { expect } from "chai";
import * as config from "./_utils";
import { Articles, Blogs, Models } from "shopify-prime";

describe("Articles", function () {
    this.timeout(30000);

    const service = new Articles(config.shopDomain, config.accessToken);
    const createdArticles: Models.Article[] = [];
    let blogId: number;

    async function createArticle(scheduleForDeletion = true) {
        const article = await service.create(blogId, {
            title: "My article title - " + Date.now(),
            author: "John Smith",
            tags: "This Post, Has Been Tagged",
            body_html: "<h1>I like articles</h1>\n<p><strong>Yea</strong>, I like posting them through <span class=\"caps\">REST</span>.</p>",
            image: {
                attachment: "R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\n"
            }
        });

        if (scheduleForDeletion) {
            createdArticles.push(article);
        }

        return article;
    }

    before((cb) => {
        new Blogs(config.shopDomain, config.accessToken).list().then((blogs) => {
            blogId = blogs[0].id;
        }).then(cb);
    })

    afterEach((cb) => setTimeout(cb, 500));

    after((cb) => {
        createdArticles.forEach(async (article) => await service.delete(blogId, article.id));

        console.log(`Deleted ${createdArticles.length} articles.`);

        setTimeout(cb, 1000);
    })

    it("should create an article", async () => {
        const article = await createArticle();

        expect(article).to.be.an("object");
        expect(article.title).to.contain("My article title - ");
        expect(article.tags).to.be.a("string");
        expect(article.body_html).to.equal("<h1>I like articles</h1>\n<p><strong>Yea</strong>, I like posting them through <span class=\"caps\">REST</span>.</p>");
        expect(article.image.src).to.be.a('string');
    })

    it("should update an article", async () => {
        const id = (await createArticle()).id;
        const title = "My updated title";
        const article = await service.update(blogId, id, { title });

        expect(article).to.be.an("object");
        expect(article.title).to.equal(title);
        expect(article.tags).to.be.a("string");
        expect(article.body_html).to.equal("<h1>I like articles</h1>\n<p><strong>Yea</strong>, I like posting them through <span class=\"caps\">REST</span>.</p>");
        expect(article.image.src).to.be.a('string');
    })

    it("should get an article", async () => {
        const id = (await createArticle()).id;
        const article = await service.get(blogId, id);

        expect(article).to.be.an("object");
        expect(article.title).to.contain("My article title - ");
        expect(article.tags).to.be.a("string");
        expect(article.body_html).to.equal("<h1>I like articles</h1>\n<p><strong>Yea</strong>, I like posting them through <span class=\"caps\">REST</span>.</p>");
        expect(article.image.src).to.be.a('string');
    })

    it("should list articles", async () => {
        const articles = await service.list(blogId);

        expect(Array.isArray(articles)).to.be.true;
    })

    it("should count articles", async () => {
        const count = await service.count(blogId);

        expect(count).to.be.a("number");
        expect(count).to.be.gte(0);
    })

    it("should delete an article", async () => {
        const id = (await createArticle(false)).id;
        let error;

        try {
            await service.delete(blogId, id);
        } catch (e) {
            error = e;
        }

        expect(error).to.be.undefined;
    })

    it("should list authors", async () => {
        const authors = await service.listAuthors();

        expect(Array.isArray(authors)).to.be.true;
    })

    it("should list tags", async () => {
        const tags = await service.listTags();

        expect(Array.isArray(tags)).to.be.true;
    })

    it("should list tags for a blog", async () => {
        const tags = await service.listTagsForBlog(blogId);

        expect(Array.isArray(tags)).to.be.true;
    })
})