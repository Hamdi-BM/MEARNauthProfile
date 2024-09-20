const User = require("../models/user");
const validateregister = require("../Validation/register");
var bcrypt = require('bcryptjs');
const validateLogin=require('../Validation/login');
var jwt = require('jsonwebtoken');
exports.Register = async (req, res) => {
    // Set default role to USER
        req.body.role = "USER";
    
    
    // Validate the registration data
    const errors = validateregister(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        await User.create(req.body);
        res.status(201).send('User registered successfully');
    } catch (error) {
        if (error.code === 11000 && error.keyValue.email) {
            return res.status(400).json({ message: `The email ${error.keyValue.email} is already in use.` });
        }
        res.status(400).send(error.message);
    }

};

exports.Login = async (req, res) => {
    // Validate the login data
    const errors = validateLogin(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found.' });
        const isMatch = bcrypt.compareSync(req.body.password, user.password) && req.body.username === user.username; 
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
        // Generate and send JWT token
        var accessToken = jwt.sign({ id: user._id ,role: user.role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        var refreshToken=jwt.sign({ id: user._id ,role: user.role}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5d' });
        try {
            await User.updateOne({ _id: user._id ,role: user.role}, { $set: { refreshToken } }, { strict: false });
            console.log('User saved successfully');  // Confirmation
          } catch (err) {
            console.error('Error saving user:', err);
          }
          
        res.cookie('refreshToken', refreshToken, { expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), httpOnly: true });
        return res.status(200).json({accessToken});
    }  catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};



