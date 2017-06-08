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

@TestFixture("SmartCollection Tests") 
export class SmartCollectionTests {
    private service = new Prime.SmartCollections(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.SmartCollection[] = [];

    @AsyncTeardownFixture
    private async teardownAsync() {
        await Promise.all(this.created.map(created => this.service.delete(created.id)));

        inspect(`Deleted ${this.created.length} objects during teardown.`);

        // Wait 2 seconds after all tests to let the API rate limit bucket empty.
        inspect("Waiting 2 seconds to let API rate limit empty.")
        
        await new Promise(resolve => setTimeout(() => {
            inspect("Continuing.")
            resolve();
        }, 2000));
    }

    private async create(scheduleForDeletion = true) {
        const obj = await this.service.create({
            
        });

        if (scheduleForDeletion) {
            this.created.push(obj);
        };

        return obj;
    }

    @AsyncTest("should count collections")
    @Timeout(5000)
    public async Test1() {
        const count = await this.service.count();
        
        Expect(count).toBeGreaterThanOrEqualTo(1);
    }

    @AsyncTest("should list collections")
    @Timeout(5000)
    public async Test2() {
        const list = await this.service.list();
        
        Expect(list).toBeAnArray();
        Expect(list).itemsToPassValidator<Prime.Models.SmartCollection>(item => {
            Expect(item.id).toBeType("number");
            Expect(item.id).toBeGreaterThanOrEqualTo(1);
        })
    }
}