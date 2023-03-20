const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(
    data,
    `Fetch recurring bill payments`,
    `v3/recurring-bills?`,
    _rave,
  );
}

module.exports = service;
