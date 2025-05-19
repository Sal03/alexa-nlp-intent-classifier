const Alexa = require('ask-sdk-core');
const { Shopify  } = require('./services');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const speakOutput = 'Welcome to daily product, where we show product recomendation every day. If you want to see today recomendation you can say "show me a new product"';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};


const ShowProductOfTheDayIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ShowProductOfTheDayIntent';
    },
    async handle(handlerInput) {
        try{
            const {attributesManager} = handlerInput;
            let speakOutput = '';
            let product = undefined;
            const attributes = await handlerInput.attributesManager.getPersistentAttributes();
            const currentProduct = attributes.currentProduct || undefined;
            
            if(currentProduct && currentProduct.id) {
                product = await Shopify.getRecommendedProduct({ sinceId: currentProduct.id });
            } 
            
            if (product === undefined) {
                product = await Shopify.getRecommendedProduct({});
            }

            attributes.currentProduct = product;
            await handlerInput.attributesManager.setPersistentAttributes(attributes);
            await handlerInput.attributesManager.savePersistentAttributes();

            speakOutput += `${product.title}`;

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt()
                .getResponse();
        } catch (e){
            console.log(e);
        }
    }
}

const CheckProductAvailabilityIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CheckProductAvailabilityIntent';
    },
    async handle(handlerInput) {
        try{
            const {attributesManager} = handlerInput;
            const attributes = await handlerInput.attributesManager.getPersistentAttributes();
            const currentProduct = attributes.currentProduct || undefined;
            if(currentProduct){
                const speakOutput = `The current availability of the product is: ${currentProduct.variants[0].inventory_quantity}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt()
                    .getResponse();
            }else {
                return handlerInput.responseBuilder
                .speak("Sorry you need to request to a product first.")
                .reprompt()
                .getResponse();
            }    
        } catch (e){
            console.log(e);
        }
    }
}

const CheckProductPriceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CheckProductPriceIntent';
    },
    async handle(handlerInput) {
        try{
            const {attributesManager} = handlerInput;
            const attributes = await handlerInput.attributesManager.getPersistentAttributes();
            const currentProduct = attributes.currentProduct || undefined;
            if(currentProduct){
                const speakOutput = `The price of the product is: ${currentProduct.variants[0].price}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt()
                    .getResponse();
            } else {
                return handlerInput.responseBuilder
                .speak("Sorry you need to request to a product first.")
                .reprompt()
                .getResponse();
            }
        } catch (e){
            console.log(e);
        }
    }
}

const AddProductToCartIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AddProductToCartIntent';
    },
    async handle(handlerInput) {
        try{
            const {attributesManager} = handlerInput;
            const attributes = await handlerInput.attributesManager.getPersistentAttributes();
            const currentProduct = attributes.currentProduct || undefined;
            if(currentProduct){
                currentProduct.quantity += 1;
                const cart = attributes.cart || [];
                attributes.cart = [...cart, ...[currentProduct]];
                await handlerInput.attributesManager.setPersistentAttributes(attributes);
                await handlerInput.attributesManager.savePersistentAttributes();
    
                const speakOutput = `Product: ${currentProduct.title}, added to the cart.`;
    
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt()
                    .getResponse();
            } else {
                return handlerInput.responseBuilder
                .speak("Sorry you need to request to a product first.")
                .reprompt()
                .getResponse();
            }
        } catch (e){
            console.log(e);
        }
    }
}

const PlaceOrderIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlaceOrderIntent';
    },
    async handle(handlerInput) {
        try{
            const {attributesManager} = handlerInput;
            const attributes = await handlerInput.attributesManager.getPersistentAttributes();
            const cart = attributes.cart || [];
            if (cart && cart.length){
                const order = await Shopify.placerOrder({
                    items: cart
                });
                attributes.cart = [];
                await handlerInput.attributesManager.setPersistentAttributes(attributes);
                await handlerInput.attributesManager.savePersistentAttributes();
    
                const speakOutput = `Order created, confirmation number: ${order.id}.`;
    
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt()
                    .getResponse();
            } else {
                return handlerInput.responseBuilder
                .speak("Sorry we can't place the order, your cart is empty.")
                .reprompt()
                .getResponse();
            }
        } catch (e){
            console.log(e);
        }
    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say "show me a new product", "check product availability", "check product price" or "place a order"';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = {
    LaunchRequestHandler,
    ShowProductOfTheDayIntentHandler,
    CheckProductAvailabilityIntentHandler,
    CheckProductPriceIntentHandler,
    PlaceOrderIntentHandler,
    AddProductToCartIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler,
    ErrorHandler
}