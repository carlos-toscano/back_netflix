module.exports = {
    SECRET_KEY: process.env.SECRET_KEY || 'Fierro',
    SECRET_KEY_STRIPE: process.env.SECRET_KEY_STRIPE || 'sk_test_oT21tWpFJOTwoMzFFsThliZ6',
    SUBSCRIPTIONS_TYPES: {
        'PLATINUM': 'plan_E1B2wUc7XnfIIP',
        'PREMIUM': 'plan_E1B3rNiXm3zMxJ',
        'GOLD': 'plan_E1B4eyti8wQAbc',
        'BASIC': 'plan_E1B5MB39Kz3cTo'
    }
};
