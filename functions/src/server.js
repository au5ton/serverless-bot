const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors({ origin: true }))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }));

app.use('/bot', require('./lib/bot/route'))

app.get('*', (_, res) => res.status(404).json({ success: false, data: 'Endpoint not found'}))
module.exports = app