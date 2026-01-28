const RaveUtils = require('../utils/rave.utils'); // Adjust path as needed
const { expect } = require('chai');

describe('RaveUtils.emptyCheck', function () {

    it('should throw an error when value is empty (Turns the Red Line Green)', function () {
        const testMessage = 'Field is required';

        // We wrap the call in a function so Chai can "catch" the explosion
        expect(() => {
            RaveUtils.emptyCheck(null, testMessage);
        }).to.throw(Error, testMessage);
    });

    it('should NOT throw when a valid value is provided', function () {
        expect(() => {
            RaveUtils.emptyCheck('Valid Value');
        }).to.not.throw();
    });

    it('should return default value via initDefaultValue', function () {
        const result = RaveUtils.initDefaultValue(null, 'default');
        expect(result).to.equal('default');

        const existing = RaveUtils.initDefaultValue('exists', 'default');
        expect(existing).to.equal('exists');
    });
});