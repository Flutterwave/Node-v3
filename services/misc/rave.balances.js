const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(data, `Fetch all balances`, `/v3/balances?`, _rave);
}

module.exports = service;
