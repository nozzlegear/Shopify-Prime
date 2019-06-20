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

@TestFixture("Customer Tests")
export class CustomerTests {
    private service = new Prime.Customers(Config.shopDomain, Config.accessToken);

    private created: Prime.Models.Customer[] = [];

    @AsyncTeardownFixture
    private async teardownAsync() {
        await Promise.all(this.created.map(created => this.service.delete(created.id)));

        inspect(`Deleted ${this.created.length} objects during teardown.`);

        // Wait 3 seconds after all tests to let the API rate limit bucket empty.
        inspect("Waiting 3 seconds to let API rate limit empty.")

        await new Promise(resolve => setTimeout(() => {
            inspect("Continuing.")
            resolve();
        }, 3000));
    }

    @AsyncTest("should count customers")
    @Timeout(5000)
    public async TestCount() {
        const count = await this.service.count();

        Expect(count).toBeGreaterThan(0);
    }

    @AsyncTest("should list customers")
    @Timeout(5000)
    public async TestList() {
        const list = await this.service.list();

        Expect(list).toBeAnArray();
        Expect(list).itemsToPassValidator<Prime.Models.Customer>(i => {
            Expect(i).toBeType("object");
            Expect(i.id).toBeGreaterThan(0);
        })
    }

    private async create(email, scheduleForDeletion = true) {
        const obj = await this.service.create({
            email: email,
            first_name: "Test",
            last_name: "User"
        });
        if (scheduleForDeletion) {
            this.created.push(obj);
        }
        return obj;
    }

    @AsyncTest("should create a customer")
    @Timeout(5000)
    public async TestCreate() {
        const customer = await this.create("createtest@gmail.com");

        Expect(customer).toBeType("object");
        Expect(customer.email).toEqual("createtest@gmail.com");
        Expect(customer.first_name).toEqual("Test");
        Expect(customer.last_name).toEqual("User");
        Expect(customer.state).toEqual("disabled");
    }

    @AsyncTest("should update a customer")
    @Timeout(5000)
    public async TestUpdate() {
        const customerId = (await this.create("updatetest@gmail.com")).id;

        const email = "updatedemail@gmail.com";
        const first_name = "NewTest";
        const last_name = "NewUser";
        const updatedCustomer = await this.service.update(customerId, {
          email,
          first_name,
          last_name
        });

        Expect(updatedCustomer).toBeType("object");
        Expect(updatedCustomer.email).toEqual(email);
        Expect(updatedCustomer.first_name).toEqual(first_name);
        Expect(updatedCustomer.last_name).toEqual(last_name);
    }

    @AsyncTest("should delete a customer")
    @Timeout(5000)
    public async TestDelete() {
      const id = (await this.create("testdelete@gmail.com", false)).id;
      let error;

      try {
        await this.service.delete(id);
      } catch (e) {
        error = e;
      }

      Expect(error).toBeNullOrUndefined();
    }

    @AsyncTest("should generate an activation url")
    @Timeout(5000)
    public async TestCreateActivationUrl() {
        const id = (await this.create("testactivation@gmail.com")).id;
        const url = await this.service.createActivationUrl(id);
        Expect(url).toContain(`${Config.shopDomain}/account/activate/`);
    }
}