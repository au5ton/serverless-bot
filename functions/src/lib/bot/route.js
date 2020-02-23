const router = require('express').Router()
const controller = require('./controller')
const config = require('../config')

router.get('/me', controller.getMe)
router.get('/hook', controller.setHook)
router.post(`/${config.telegram.webhook_secret}`, controller.webhook)

module.exports = router