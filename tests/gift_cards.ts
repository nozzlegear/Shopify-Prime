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

@TestFixture("GiftCard Tests")
export class GiftCardTests {
    @AsyncTest("should create a Gift Card")    
    @IgnoreTest("cannot be tested without a Shopify Plus account.")
    public async Test1() { }

    @AsyncTest("should get a Gift Card")
    @IgnoreTest("cannot be tested without a Shopify Plus account.")
    public async Test2() { }

    @AsyncTest("should search for a Gift")
    @IgnoreTest(" but cannot be tested without a Shopify Plus account.")
    public async Test3() { }

    @AsyncTest("should count Gift Cards,")
    @IgnoreTest("annot be tested without a Shopify Plus account.")
    public async Test4() { }

    @AsyncTest("should list Gift Cards,")
    @IgnoreTest("annot be tested without a Shopify Plus account.")
    public async Test5() { }

    @AsyncTest("should delete a Gift Card")
    @IgnoreTest("cannot be tested without a Shopify Plus account.")
    public async Test6() { }

}