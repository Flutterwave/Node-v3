const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(data, `Fetch all cards`, `/v3/virtual-cards?`, _rave);
}
module.exports = service;
