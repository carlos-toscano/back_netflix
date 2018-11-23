const Users = require('./../schemas/Users');
const createToken = require('./createToken');

module.exports = (email, password) => {
    return new Promise((resolve, reject) => {
        Users.findOne({ email: email }).then(user => {
            if (!user) reject(new Error('Usuario o Password incorrecto'));

            user.comparePassword(password, (err, isMatch) => {
                if (err) reject(err);

                if (isMatch) {
                    resolve(createToken(user));
                } else {
                    reject(new Error('Usuario o Password incorrecto'));
                }
            })
        }).catch(err => {
            reject(err);
        })
    })
}
