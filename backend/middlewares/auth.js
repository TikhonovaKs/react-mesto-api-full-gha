const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!token) {
    throw new UnauthorizedError('Authorisation error');
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
  }
  req.user = payload;
  next();
};

module.exports = auth;
