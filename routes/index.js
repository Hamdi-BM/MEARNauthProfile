var express = require('express');
const verifyToken = require('../middleware/verifyJwt');
const { Register, Login} = require('../controllers/users.controllers');
const { GetAllProfiles, GetSingleProfile, DelProfile, AddProfile } = require('../controllers/profile.controllers');
var router = express.Router();

// users routes
router.post('/register', Register);
router.post('/login',Login);
router.post('/profile',AddProfile);
router.get('/profiles',GetAllProfiles);
router.get('/profile/:id',GetSingleProfile);
router.delete('/profile/:id',DelProfile);

module.exports = router;
