const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(
    data,
    `Fetch all subscriptions`,
    `/v3/subscriptions?`,
    _rave,
  );
}

module.exports = service;
