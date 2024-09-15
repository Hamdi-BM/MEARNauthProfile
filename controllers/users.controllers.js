const User = require("../models/user");
const validateregister = require("../Validation/register");
var bcrypt = require('bcryptjs');
const validateLogin=require('../Validation/login');
var jwt = require('jsonwebtoken');
exports.Register = async (req, res) => {
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
        return res.status(200).json({message : 'connected'})
    }  catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};