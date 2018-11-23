const { SECRET_KEY_STRIPE, SUBSCRIPTIONS_TYPES } = require('./../const');
const Stripe = require('stripe')(SECRET_KEY_STRIPE);

module.exports = (subscription, customer, type) => {
    Stripe.subscriptions.create({
        customer,
        items: [
            {
                plan: SUBSCRIPTIONS_TYPES[type]
            }
        ]
    }, (err, subs) => {
        if (err) throw err;

        subscription.stripe_id = subs.id;
        subscription.type_subscription = type;

        subscription.save();
    })
}
