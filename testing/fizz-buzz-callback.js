module.exports = function (number, callback) {
    if (typeof number === 'number' && number > 0) {
        if (number % 3 === 0 && number % 5 === 0) {
            callback(null, 'fizz buzz');
            return;
        }

        if (number % 3 === 0) {
            callback(null, 'fizz');
            return;
        }

        if (number % 5 === 0) {
            callback(null, 'buzz');
            return;
        }

        return callback(null, number);
    }

    callback(new Error('Invalid parameter'));
};
