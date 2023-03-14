const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(
    data,
    `Fetch all transactions`,
    `/v3/transactions?`,
    _rave,
  );
}

module.exports = service;
