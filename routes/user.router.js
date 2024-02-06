const express = require('express')
const {login, signUpUser} = require('../controllers/user.controller')
const router = express.Router()

router.post('/login',login)
router.post('/signup',signUpUser)

module.exports = router
