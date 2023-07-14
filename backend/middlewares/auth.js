const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    next(new UnauthorizedError('Unauthorized request'));
    return;
  }
  const token = req.headers.authorization.split(' ')[1];
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!token) {
    next(new UnauthorizedError('Unauthorized request'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Unauthorized request'));
    } else {
      next(err);
    }
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
