const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(
    data,
    `Fetch all subaccount`,
    `/v3/subaccounts?`,
    _rave,
  );
}

module.exports = service;
