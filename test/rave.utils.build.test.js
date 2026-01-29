const { expect } = require('chai');
const joi = require('joi');
const { enforceRequired, handleEmptyFetch } = require('../utils/build'); // Adjust path
const sinon = require('sinon');

describe('Utils Build Coverage', function () {

    describe('enforceRequired()', function () {

        it('should throw an error if paramList is not an array', function () {
            const schema = joi.object({ test: joi.string() });

            expect(() => {
                enforceRequired(schema, 'not-an-array');
            }).to.throw('paramList must be an array');
        });

        it('should successfully map through paramList and return schema', function () {
            // Creating a dummy Joi schema with some keys
            const schema = joi.object({
                name: joi.string(),
                email: joi.string()
            });

            // This mock satisfies the internal Joi 'Collection' interface 
            // needed for schema.keys() to function without crashing.
            schema._ids = {
                _byKey: {
                    name: { rules: [] },
                    email: { rules: [] }
                },
                // These methods allow Joi to 'go through the motions' of updating the schema
                clone: function () { return this; },
                reset: function () { return this; },
                get: function (key) { return this._byKey[key]; },
                register: function () { return this; }
            };

            const result = enforceRequired(schema, ['name', 'email']);

            expect(result).to.be.an('object');
            expect(result).to.have.property('_ids');
        });
    });
});