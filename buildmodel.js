const { ControlInteractionModelGenerator } = require('ask-sdk-controls');

new ControlInteractionModelGenerator()
    .withInvocationName('daily product')
    .addIntent({ name: 'AMAZON.StopIntent' })
    .addIntent({ name: 'AMAZON.NavigateHomeIntent' })
    .addIntent({ name: 'AMAZON.HelpIntent' })
    .addIntent({ name: 'AMAZON.CancelIntent' })

    // Add a custom intent
    .addIntent({ 
        name: 'ShowProductOfTheDayIntent', 
        samples: [
            'show me a new product',
            'show me a product',
            'show product',
        ]
    })
    .addIntent({ 
        name: 'CheckProductPriceIntent', 
        samples: [
            'check product price',
            'check price',
            'price',
        ]
    })
    .addIntent({ 
        name: 'CheckProductAvailabilityIntent', 
        samples: [
            'check product availability',
            'check availability',
            'availability',
        ]
    })
    .addIntent({ 
        name: 'AddProductToCartIntent', 
        samples: [
            'add product to cart',
            'add product',
            'add',
        ]
    })
    .addIntent({ 
        name: 'PlaceOrderIntent', 
        samples: [
            'place an order',
            'place order',
            'place',
            'order',
        ]
    })
    // .addIntent({ 
    //     name: 'AddProductIntent', 
    //     samples: [
            
    //     ]
    // })
    // .addDialogIntents({
    //     name:  'AddProductIntent',
    //     confirmationRequired: true,
    //     prompts: {
    //         confirmation: 'Confirm.Intent.1'
    //     },
    //     delegationStrategy: 'ALWAYS'
    // }).addPrompt({
    //     id: 'Confirm.Intent.1',
    //     variations: [
    //         {
    //             type: 'PlainText',
    //             value: 'That's did I get that right?'
    //         }
    //     ]
    // })

    // Build and write (be careful, this overwrites your existing model!!!)
    .buildAndWrite('../skill-package/interactionModels/custom/en-US.json');