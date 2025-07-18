const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { getSetting, postSetting } = require('../controllers/settingsController')

router.get('/', authMiddleware, getSetting)
router.post('/', authMiddleware, postSetting)

module.exports = router