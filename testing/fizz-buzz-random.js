var request = require('request');

var getRandomWord = function (callback) {
    request('http://www.setgetgo.com/randomword/get.php?len=4', {}, function (error, response) {
            callback(null, response.body);
            });
};

module.exports = function (number, callback) {
    getRandomWord(function (error, fizzBuzz) {
        if (typeof number === 'number' && number > 0) {
            if (number % 3 === 0 && number % 5 === 0) {
                callback(null, fizzBuzz);
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
    });
};
