const { handleEmptyFetch } = require('../../utils/build');

async function service(data, _rave) {
  return handleEmptyFetch(
    data,
    `Fetch all settlements`,
    `v3/settlements?`,
    _rave,
  );
}

module.exports = service;
