const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/authRoutes');
const protectedRoute = require('./routes/protectedRoute');
const transactionRoutes = require('./routes/transactionRoutes')
const settings = require('./routes/settings')

app.use('/api/auth', authRoutes)
app.use('/api/protected', protectedRoute);
app.use('/api/transactions', transactionRoutes);
app.use("/api/settings", settings)

const port = process.env.PORT || 8000 

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('db is connected')
})
.catch(err=>{
    console.log(err)
})

app.get('/', (req, res)=>{
    res.send('hello i am root')    
})

app.listen(port, ()=> {
    console.log(`server is runnin on post : ${port}`);
})