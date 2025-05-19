const Alexa = require('ask-sdk-core');
const Handlers = require('./src/handlers');
const util = require('./util');

const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        Handlers.LaunchRequestHandler,
        Handlers.ShowProductOfTheDayIntentHandler,
        Handlers.CheckProductPriceIntentHandler,
        Handlers.CheckProductAvailabilityIntentHandler,
        Handlers.AddProductToCartIntentHandler,
        Handlers.PlaceOrderIntentHandler,
        Handlers.HelpIntentHandler,
        Handlers.CancelAndStopIntentHandler,
        Handlers.FallbackIntentHandler,
        Handlers.SessionEndedRequestHandler,
        Handlers.IntentReflectorHandler
    )
    .addErrorHandlers(
        Handlers.ErrorHandler
    )
    .withPersistenceAdapter(util.getPersistenceAdapter())
    .withCustomUserAgent('pucmm-isc/shop-voice/v1.0')
    .lambda();

module.exports = {
    handler
}