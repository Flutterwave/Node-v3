const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(
    data,
    `Fetch bill payment agencies`,
    `v3/billers?`,
    _rave,
  );
}

module.exports = service;
