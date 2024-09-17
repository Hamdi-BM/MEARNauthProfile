var express = require('express');
const verifyToken = require('../middleware/verifyJwt');
const { Register, Login } = require('../controllers/users.controllers');
var router = express.Router();

// users routes
router.post('/register', Register);
router.post('/login',Login);
module.exports = router;
