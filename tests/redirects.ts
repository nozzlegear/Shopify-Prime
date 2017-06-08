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

@TestFixture("Redirect Tests") 
export class RedirectTests {
    private service = new Prime.Redirects(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.Redirect[] = [];

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
            path: createGuid(),
            target: `https://www.gooogle.com?q=croatia`
        });

        if (scheduleForDeletion) {
            this.created.push(obj);
        };

        return obj;
    }

    @AsyncTest("should list redirects")
    @Timeout(5000)
    public async Test1() {
        const list = await this.service.list();

        Expect(Array.isArray(list)).toBe(true);
    }

    @AsyncTest("should count redirects")
    @Timeout(5000)
    public async Test2() {
        const count = await this.service.count();

        Expect(count).toBeType("number");
        Expect(count).toBeGreaterThanOrEqualTo(0);
    }

    @AsyncTest("should create a redirect")
    @Timeout(5000)
    public async Test3() {
        const newRedirect = await this.create();

        Expect(newRedirect.id).toBeType("number");
        Expect(newRedirect.target).toBeType("string");
        Expect(newRedirect.path).toBeType("string");
    }

    @AsyncTest("should get a redirect by Id")
    @Timeout(5000)
    public async Test4() {
        const created = await this.create();
        const res = await this.service.get(created.id)

        Expect(res.id).toBeType("number");
        Expect(res.path).toBeType("string");
        Expect(res.target).toBeType("string");
    }

    @AsyncTest("should delete a redirect by Id")
    @Timeout(5000)
    public async Test5() {
        const created = await this.create(false);
        let error;

        try {
            await this.service.delete(created.id);
        } catch (_e) {
            error = _e;
            
            this.created.push(created);
        }

        Expect(error).toBeNullOrUndefined();
    }
}