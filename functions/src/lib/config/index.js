
const functions = require('firebase-functions');
const path = require('path');
const fs = require('fs');
const load = () => {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'config.json')))
    }
    catch(err) {
        return {
            __meta__config__err: 'failed to load data from config file',
            __meta__config__err__msg: err
        };
    }
}
const empty = (obj) => (Object.entries(prod).length === 0 && prod.constructor === Object)


const prod = functions.config();
const dev = load();
const flag = empty(prod);
prod.__meta__config_ds = 'prod';
dev.__meta__config_ds = 'dev';
prod.package = require('root-require')('package.json');
dev.package = require('root-require')('package.json');

// supplies the local config if `functions.config()` supplies an empty object
module.exports = flag ? dev : prod