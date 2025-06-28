const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const generateResetToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.RESET_PASSWORD_SECRET,
    { expiresIn: '1h' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyResetToken = (token) => {
  return jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
};

module.exports = {
  generateToken,
  generateResetToken,
  verifyToken,
  verifyResetToken
}; 