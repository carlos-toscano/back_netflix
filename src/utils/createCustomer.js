const { SECRET_KEY_STRIPE } = require('./../const');
const Stripe =  require('stripe')(SECRET_KEY_STRIPE);

module.exports = email => {
    return new Promise((resolve, reject) => {
        Stripe.customers.create({ email }, (err, customer) => {
            if (err) reject(err);

            resolve(customer);
        })
    })
}
