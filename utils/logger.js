const axios = require('axios');
const package = require('../package.json');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, errors, printf, json } = format;

function logger(name, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: name,
    },
  );
}

const errorLogger = createLogger({
  transports: [
    new transports.Console({
      format: combine(
        errors({
          stack: true,
        }),
        timestamp(),
        json(),
      ),
    }),
  ],
});

module.exports = { errorLog: errorLogger, logger: logger };
