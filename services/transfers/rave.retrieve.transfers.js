const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(data, `Fetch all transfers`, `/v3/transfers?`, _rave);
}

module.exports = service;
