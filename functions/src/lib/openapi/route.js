const router = require('express').Router()
const controller = require('./controller')

/**
 * @swagger
 *
 * /openapi/docs.json:
 *   get:
 *     description: Generates OpenAPI JSON data that describes how to consume the API
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OpenAPI json data
 */
router.get('/docs.json', controller.generate)

module.exports = router