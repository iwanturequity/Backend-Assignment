const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  requestPasswordReset, 
  resetPassword,
  getCurrentUser
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Protected route
router.get('/me', authenticate, getCurrentUser);

module.exports = router;