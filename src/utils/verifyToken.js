const jwt = require('jsonwebtoken');
const User = require('./../schemas/Users');
const { SECRET_KEY } = require('./../const');

module.exports = function(req) {
    const Authorization = req.headers['authorization'];

    if (Authorization) {
        const token = Authorization.replace('JWT', '').trim();
        const {id} = jwt.verify(token, SECRET_KEY);

        return User.findById(id).then(user => {
            return user;
        }).catch(err => {
            throw err;
        })
    }
}
