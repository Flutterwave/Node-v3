const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(
    data,
    `Fetch bill categories`,
    `v3/bill-categories?`,
    _rave,
  );
}

module.exports = service;
