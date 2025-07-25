const express = require('express')
const router = express.Router()

const { register, login, forgotPasswordController, resetPassword, changePassword  } = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPasswordController);
router.put('/reset-password', resetPassword)
router.post('/change-password', authMiddleware, changePassword)

module.exports = router