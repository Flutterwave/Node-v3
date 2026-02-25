async function service(path, data, _rave) {
  if (!path) {
    throw new Error('A valid path is required for custom requests');
  }

  const { body: response } = await _rave.request(path, data);
  return response;
}

module.exports = service;
