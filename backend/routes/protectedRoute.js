const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Access granted to protected route',
    userId: req.user.userId
  });
});

module.exports = router;
