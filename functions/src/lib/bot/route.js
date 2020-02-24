const router = require('express').Router()
const controller = require('./controller')
const config = require('../config')

router.get('/me', controller.getMe)
router.get('/hook', controller.setWebhook)
router.post(`/${config.telegram.webhook_secret}`, controller.handleWebhook)

module.exports = router