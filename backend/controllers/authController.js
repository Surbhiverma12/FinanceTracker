const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

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
        const user = await User.findOne({email})
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

exports.forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  console.log('forget passward is called')
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hash;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `Click to reset your password: ${resetUrl}`,
    });

    res.status(200).json({ message: 'Reset link sent to email' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    console.log("Password:", password);
    console.log("Token:", token);

    if (!token) return res.status(400).json({ message: "Token missing" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log("Hashed Token:", hashedToken);

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
