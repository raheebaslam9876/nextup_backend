const GlobalPackages = require('../../global-package');
const router = GlobalPackages.express.Router();
const stripeController = require('../../controllers/stripeController');
const globalServices = require("../../services/index")
// ********************************************  
// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = ;

router.post('/webhook-local', GlobalPackages.express.raw({ type: "*/*" }), (request, response) => {
    const payload = request.body
    const payloadString = JSON.stringify(payload, null, 2);
    const secret = process.env.STRIPE_WEBHOOK_SIGNATURE;
    const header = GlobalPackages.stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
    });
    let event;
    try {
        // *************************************************************
        event = GlobalPackages.stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (err) {
        console.log("error found in webhook", err.message)
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    console.log(event.type)
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object; 
            // GlobalServices.stripe.faitStripeMinting(paymentIntent)
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

// router.post('/stripePaymentLink', metaMaskprotectRoute, stripeController.createPaymentLink);




module.exports = router;