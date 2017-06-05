import * as Prime from '../';
import {
    AsyncTest,
    IgnoreTest,
    TestFixture,
    Timeout
    } from 'alsatian';
import { Config, Expect } from './_utils';

@TestFixture("Application Credits")
class ApplicationCreditTests {
    @AsyncTest("Creates an application credit")
    @IgnoreTest("Cannot be tested with a private app.")
    public async CreatesCredits() { }

    @AsyncTest("Gets an application credit")
    @IgnoreTest("Cannot be tested with a private app.")
    public async GetsCredits() { }

    @AsyncTest("Lists application credits")
    public async ListsCredits() {
        const service = new Prime.ApplicationCredits(Config.shopDomain, Config.accessToken);
        const credits = await service.list();

        Expect(credits).toBeAnArray();
    }
}