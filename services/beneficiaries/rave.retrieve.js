const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(
    data,
    `Fetch all transfer beneficiaries`,
    `/v3/beneficiaries?`,
    _rave,
  );
}

module.exports = service;
