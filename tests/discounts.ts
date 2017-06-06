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

@TestFixture("Discount Tests")
export class DiscountTests {
    @AsyncTest("should create a Discount")
    @IgnoreTest("cannot be tested without a Shopify Plus account.")
    public async Test1() { }

    @AsyncTest("should get a Discount")
    @IgnoreTest("cannot be tested without a Shopify Plus account.")
    public async Test2() { }

    @AsyncTest("should list Discounts,")
    @IgnoreTest("annot be tested without a Shopify Plus account.")
    public async Test3() { }

    @AsyncTest("should delete a Discount")
    @IgnoreTest("cannot be tested without a Shopify Plus account.")
    public async Test4() { }

    @AsyncTest("should enable a Discount")
    @IgnoreTest("cannot be tested without a Shopify Plus account.")
    public async Test5() { }

    @AsyncTest("should disable a Discount")
    @IgnoreTest("cannot be tested without a Shopify Plus account.")
    public async Test6() { }
}