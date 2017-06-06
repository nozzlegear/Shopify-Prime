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

@TestFixture("Charge Tests")
export class ChargeTests {
    @AsyncTest("should list charges,")
    @IgnoreTest("Cannot be tested with a private app.")
    public async Test1() { }

    @AsyncTest("should get a charge")
    @IgnoreTest("Cannot be tested with a private app.")
    public async Test2() { }

    @AsyncTest("should create a charge")
    @IgnoreTest("Cannot be tested with a private app.")
    public async Test3() { }

    @AsyncTest("should activate a charge")
    @IgnoreTest("Cannot be tested with a private app.")
    public async Test4() { }
}