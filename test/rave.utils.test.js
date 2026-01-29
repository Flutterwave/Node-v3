const RaveUtils = require('../utils/rave.utils'); // Adjust path as needed
const { expect } = require('chai');

describe('RaveUtils.emptyCheck', function () {

    it('should throw an error when value provided is empty', function () {
        const testMessage = 'Field is required';

        expect(() => {
            RaveUtils.emptyCheck(null, testMessage);
        }).to.throw(Error, testMessage);
    });
});