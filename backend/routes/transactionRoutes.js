const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { addTransaction, getAllTransactions } = require('../controllers/transactionController')

router.post('/', authMiddleware, addTransaction)
router.get('/', authMiddleware, getAllTransactions)

module.exports = router