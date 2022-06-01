const express = require('express');
const router = express.Router();
const {createUser, logIn} = require('../Controllers/user');

//create user using sign up
router.post('/signup', createUser);

router.post('/login', logIn);

module.exports = router;