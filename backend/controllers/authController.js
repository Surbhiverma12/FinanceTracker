const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try{
        const {name, email, password} = req.body

        const existingUSer = await User.findOne({email})
        if(existingUSer){
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedpassword = await bcrypt.hash(password,10)

        const user = new User ({
            name: name,
            email: email,
            password: hashedpassword
        })

        await user.save()

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: `1d`})


        res.status(201).json({
            token,
            user: {
                id: user._id,
                name:user.name,
                email:user.email
            },
            message: `Welcome ${name}! you are registered successfully. `})
            console.log(`user reistered ${user}`)

    }catch(error) {
    res.status(500).json({ error: error.message });
  }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        console.log(req.body)
        const user = await User.findOne({email})
        console.log(user)
        if (!user){
            return res.status(400).json({message: 'user does not exists'})
        }

        // const hashedpassword = await bcrypt.hash(password, 10)

        // console.log(hashedpassword, user.password)
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message: `Wrong password! Try Again`})
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: `1d`})

        res.status(201).json({
            token,
            user: {
                id : user._id,
                email: user.email,
                name: user.name
            },
            message: `Welcome ${user.name}! You are logged in successfully.`

        })
        console.log(`user logged in`)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}