const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubscriptionsSchema = new Schema({
    type_subscription: {
        type: String,
        enum: ['BASIC', 'GOLD', 'PREMIUM', 'PLATINUM'],
        required: true
    },
    price: {
        type: String,
        enum: ['0', '99', '199'],
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    stripe_id: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    collection: 'subscriptions',
    timestamps: true
});

module.exports = mongoose.model('subscriptions', SubscriptionsSchema);
