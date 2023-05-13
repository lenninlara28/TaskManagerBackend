const boom = require('@hapi/boom');

function logErrors(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function errorHandler(err, req, res, next) {
  // eslint-disable-line
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode).json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
