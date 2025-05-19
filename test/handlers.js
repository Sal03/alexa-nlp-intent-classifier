const { SkillTester, waitForDebugger, TestInput } = require('ask-sdk-controls');
const { expect } = require('chai');
const { suite, test } = require('mocha');
const { LaunchRequestHandler, ShowProductOfTheDayIntentHandler } = require('../src/handlers');

waitForDebugger();

suite("Handlers", () => {
    test("Launch", async () => {
        const tester = new SkillTester(LaunchRequestHandler);
        const testResponseObj = await tester.testTurn("U: __", TestInput.launchRequest(), `A: Welcome to daily product, where we show product recomendation every day, here is the product of the day.`);
        expect(testResponseObj.response.shouldEndSession).equals(false);
    });

    test("Products", async () => {
        const tester = new SkillTester(ShowProductOfTheDayIntentHandler);
        const testResponseObj = await tester.testTurn("U: products", TestInput.intent('ShowProductOfTheDayIntent'), `A: This are ours products`);
        expect(testResponseObj.response.shouldEndSession).equals(false);
    });
})