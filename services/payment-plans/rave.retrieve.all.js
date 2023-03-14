const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(data, `Fetch all plans`, `v3/payment-plans?`, _rave);
}

module.exports = service;
