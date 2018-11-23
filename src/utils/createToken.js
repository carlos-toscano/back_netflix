const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./../const');

module.exports = user => {
    const payload = {
        id: user._id,
        email: user.email,
        first_name: user.first_name
    };

    let token = jwt.sign(payload, SECRET_KEY);

    return token;
}
