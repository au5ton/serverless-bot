const functions = require('firebase-functions')
const server = require('./src/server')
const api = functions
            .runWith({ memory: '256MB', timeoutSeconds: 120 })
            .https.onRequest(server)

module.exports = {
    api
}
