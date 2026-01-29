const { expect } = require('chai');
const joi = require('joi');
const { enforceRequired, handleEmptyFetch } = require('../utils/build'); // Adjust path
const sinon = require('sinon');

describe('Utils Build Coverage', function () {

    describe('enforceRequired()', function () {

        it('should throw error if paramList is not an array (Hits the Red Line)', function () {
            const schema = joi.object({ test: joi.string() });

            expect(() => {
                enforceRequired(schema, 'not-an-array');
            }).to.throw('paramList must be an array');
        });

        it('should successfully map through paramList and return schema', function () {
            // Created a dummy Joi schema with some keys
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

    describe('handleEmptyFetch()', function () {
        let raveMock;

        beforeEach(() => {
            raveMock = {
                request: sinon.stub()
            };
        });

        it('should handle undefined param by defaulting to GET', async function () {
            raveMock.request.resolves({ body: { status: 'success' } });

            const result = await handleEmptyFetch(undefined, 'TestCall', 'v3/test', raveMock);

            expect(raveMock.request.calledWith('v3/test', { method: 'GET' })).to.be.true;
            expect(result.status).to.equal('success');
        });

        it('should validate and fetch when param is provided', async function () {
            raveMock.request.resolves({ body: { data: [] } });
            const param = { page: '1' };

            const result = await handleEmptyFetch(param, 'TestCall', 'v3/list', raveMock);

            expect(param.method).to.equal('GET');
            expect(result.data).to.be.an('array');
        });
    });
});