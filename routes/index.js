var express = require('express');
const verifyToken = require('../middleware/verifyJwt');
const { Register, Login, Test, Admin } = require('../controllers/users.controllers');
var router = express.Router();

// users routes
router.post('/register', Register);
router.post('/login',Login);
router.get('/test',verifyToken,Test);
router.get('/admin',verifyToken,Admin);
module.exports = router;
