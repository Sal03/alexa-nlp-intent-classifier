const { expect } = require('chai');
const { suite, test } = require('mocha');
const { Shopify } = require('../src/services');


suite("Services", () => {
    test("Get Product", async () => {
        const product = await Shopify.getRecommendedProduct({});
        expect(product).to.be.ok;
    }, 12000);
    test("Get Customer", async () => {
        const customer = await Shopify.getCustomer({ email: 'dfana@dfb.com.do'});
        expect(customer).to.be.ok;
    }, 12000);
    test("Get Orders", async () => {
        const orders = await Shopify.getOrders({ email: 'dfana@dfb.com.do'});
        expect(orders).to.be.not.empty;
    }, 12000);
    // test("Placer Order", async () => {
    //     const data = {
    //         email: 'dfana@dfb.com.do',
    //         items: [
    //             {
    //                 variantId: 40800983154865,
    //                 quantity: 1
    //             }
    //         ]
    //     };
    //     const orderPlaced = await Shopify.placerOrder(data);
    //     expect(orderPlaced).to.be.ok;
    // }, 12000);
})