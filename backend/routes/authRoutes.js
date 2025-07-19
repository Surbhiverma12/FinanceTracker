const express = require('express')
const router = express.Router()

const { register, login, forgotPasswordController, resetPassword  } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPasswordController);
router.put('/reset-password', resetPassword)

module.exports = router