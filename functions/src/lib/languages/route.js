const router = require('express').Router()
const controller = require('./controller')

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    Language:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          default: "English"
 *        code:
 *          type: string
 *          default: "en_us"
 */


/**
 * @swagger
 *
 * /languages/all:
 *   get:
 *     description: Does a thing
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of all languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 */
router.get('/all', controller.getAllLanguages)
/**
 * @swagger
 *
 * /languages/{language}:
 *   get:
 *     description: Gets information about a specific language
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Information about a specific language
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 */
router.get('/:language', controller.getLanguage)

module.exports = router