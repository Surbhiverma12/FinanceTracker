const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) =>{
    try {
        // console.log(body)
        // console.log('add trans called')
        // console.log("🟢 req.user:", req.user);
        const {type, category, amount, date, note} = req.body
        const transaction = new Transaction({
            userId: req.user.userId,
            type: type,
            category: category,
            amount: amount,
            date: date,
            note: note
        })
        console.log(transaction)
        await transaction.save()

        console.log(transaction)

        res.status(200).json({message: 'Transaction added', transaction})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getAllTransactions = async (req, res) => {
    try {
        console.log('get trans is called')
        const transaction = await Transaction.find({userId : req.user.userId}).sort({ date: -1 } )
        console.log(transaction)
        res.status(200).json({ transaction})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}