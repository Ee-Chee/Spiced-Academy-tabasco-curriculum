module.exports = function (number) {
    if (typeof number === 'number') {
        if (number <= 50) {
            if (number % 3 === 0 && number % 5 === 0) {
                return 'fizz buzz';
            }

            if (number % 3 === 0) {
                return 'fizz';
            }

            if (number % 5 === 0) {
                return 'buzz';
            }

            return number;
        }

        return {
            message: 'Please provide a number less or equal 50'
        };
    }

    throw new Error('Invalid parameter');
};
