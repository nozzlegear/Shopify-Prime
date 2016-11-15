import { expect } from "chai";
import * as config from "./_utils";
import { Blogs, Models } from "shopify-prime";

describe("Blogs", async function () {
    this.timeout(30000);

    const service = new Blogs(config.shopDomain, config.accessToken);
    const createdBlogs: Models.Article[] = [];

    async function createBlog(scheduleForDeletion = true) {
        const blog = await service.create({
            title: "Shopify Prime Test Blog - " + Date.now(),
            commentable: "moderate"
        });

        if (scheduleForDeletion) {
            createdBlogs.push(blog);
        };

        return blog;
    }

    afterEach((cb) => setTimeout(cb, 500));

    after((cb) => {
        createdBlogs.forEach(async (blog) => await service.delete(blog.id));

        console.log(`Deleted ${createdBlogs.length} blogs.`);

        setTimeout(cb, 1000);
    })

    it("should create a blog", async () => {
        const blog = await createBlog();

        expect(blog).to.be.an("object");
        expect(blog.title).to.contain("Shopify Prime Test Blog - ");
        expect(blog.commentable).to.equal("moderate");        
    })

    it("should get a blog", async () => {
        const id = (await createBlog()).id;
        const blog = await service.get(id);

        expect(blog).to.be.an("object");
        expect(blog.title).to.contain("Shopify Prime Test Blog - ");
        expect(blog.commentable).to.equal("moderate");
    })

    it("should update a blog", async () => {
        const title = "My Updated Title";
        const id = (await createBlog()).id;
        const blog = await service.update(id, {title});

        expect(blog).to.be.an("object");
        expect(blog.title).to.equal(title);
        expect(blog.commentable).to.equal("moderate");
    })

    it("should list blogs", async () => {
        const list = await service.list();

        expect(Array.isArray(list)).to.be.true;
    })

    it("should count blogs", async () => {
        const count = await service.count();

        expect(count).to.be.a("number");
        expect(count).to.be.gte(1);
    })

    it("should delete a blog", async () => {
        const blog = await createBlog(false);
        let error;

        try {
            await service.delete(blog.id);
        } catch (e) {
            error = e;
        }

        expect(error).to.be.undefined;
    });
})