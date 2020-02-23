const swaggerJSDoc = require('swagger-jsdoc')
const package = require('root-require')('package.json')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: package.name,
            version: package.version,
            description: package.description
        }
    },
    apis: [
        'src/lib/**/route.js',
    ]
}

module.exports.generate = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerJSDoc(options))
}