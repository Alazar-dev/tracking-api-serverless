const jwt = require('jsonwebtoken');
const { secret } = require('./config');

module.exports.jwtVerify = headers => {
    return new Promise((resolve, reject) => {

        console.log(headers);

        let token = headers['x-access-token'] || headers['authorization'] || headers['Authorization'];

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        if (token) {

            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });

        } else {

            reject({
                success: false,
                message: 'Auth token is not supplied'
            });

        }

    });
};