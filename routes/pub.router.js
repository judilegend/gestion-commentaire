const express = require('express')
const { AddPublication1 } = require('../controllers/pub.controller')
const router = express.Router()

// router.get('/api/affiche', AfficherPub)
router.post('/api/upload', AddPublication1)

module.exports = router
