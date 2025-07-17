const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { addTransaction, getAllTransactions, deleteTransaction } = require('../controllers/transactionController')

router.post('/', authMiddleware, addTransaction)
router.get('/', authMiddleware, getAllTransactions)
router.delete('/:id', authMiddleware, deleteTransaction)

module.exports = router