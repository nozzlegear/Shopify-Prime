import { expect } from "chai";
import * as config from "./_utils";
import { GiftCards, Models } from "shopify-prime";
import GiftCard = Models.GiftCard;

describe("Gift Cards", function () {
    this.timeout(10000);

    const service = new GiftCards(config.shopDomain, config.accessToken);
    let g: GiftCard

    it("should create a Gift Card", async () => {
        let newGiftCard: GiftCard = {
            initial_value: 100,
            note: "This is a note",
            code: "ABCD EFGH IJKL MNOP",
            currency: "AUD",
            expires_on: new Date(2017, 12, 12)
        }

        g = await service.create(newGiftCard);

        console.log(g)

        expect(g).to.not.be.null;
        expect(g.id).to.be.a("number");
        expect(g.balance).to.eq(newGiftCard.initial_value);
        expect(g.currency).to.eq(newGiftCard.currency);
        expect(g.note).to.eq(newGiftCard.note);
    });

    it("should get a Gift Card by Id", async () => {
        const res = await service.get(g.id)

        expect(res).to.not.be.null;
        expect(res.id).to.not.be.null;
        expect(res.id).to.be.a("number");

        console.log(res)
    })

    // it("should delete a Gift Card by Id", async() => {
    //     await service.delete(g.id)
    //
    //     try {
    //         await service.get(g.id)
    //
    //         throw new Error("Expected an error")
    //
    //     } catch (err) {
    //         // Expect a 404 Not Found
    //         expect(err.statusCode).to.eq(404)
    //     }
    // })

}) 