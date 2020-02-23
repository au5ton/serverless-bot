
const util = require('util');
const readFile = util.promisify(require('fs').readFile);
const path = require('path');
const fetch = require('node-fetch');
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function() {
  
    
    
    const config = JSON.parse(await readFile(path.join(__dirname, '..', '..', '..', 'config.json')));
    
    /**
     * Do your own thing
     */

    // // try and pressure a webhook set
    // const nap = 10000;
    // console.log(`Snoozing ${nap/1000} seconds before attempting to pressure a webhook set... 💤💤`);
    // await snooze(nap);
    // console.log('\tHooking! 📣📣')
    // fetch(`https://${config.gcp.datacenter}-${config.gcp.project_id}.cloudfunctions.net/bot/hook`)
    //     .then(res => res.text())
    //     .then(body => console.log(body))
    //     .catch(err => {
    //         console.error(err);
    //     });
  })();