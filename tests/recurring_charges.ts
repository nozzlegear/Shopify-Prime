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

@TestFixture("RecurringCharge Tests")
class RecurringChargeTests {
    
    @AsyncTest("should list charges ")
    @IgnoreTest("cannot be tested with a private app.")
    public async Test1() { }

    @AsyncTest("should get a charge ")
    @IgnoreTest("cannot be tested with a private app.")
    public async Test2() { }

    @AsyncTest("should create a charge ")
    @IgnoreTest("cannot be tested with a private app.")
    public async Test3() { }

    @AsyncTest("should activate a charge ")
    @IgnoreTest("cannot be tested with a private app.")
    public async Test4() { }
}