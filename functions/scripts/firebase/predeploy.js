
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(require('fs').readFile);
const path = require('path');
const chalk = require('chalk');

(async function() {

    /**
     * Lints the config.json file that would contain
     * private keys and other configuration data you 
     * would not want in source control.
     */

    function check(word, depth) {
      let terminate = false;
      if(word.toLowerCase() !== word) {
        // firebase function configs MUST be strictly lowercase
        console.error(chalk.redBright.bold(`fatal: '${word}' must be lowercase to be used as a namespace or key.`));
        terminate = true;
      }
      else if(word === 'firebase' && depth === 0) {
        // reserved word
        console.error(chalk.redBright.bold(`fatal: '${word}' is a reserved word for namespaces`));
        terminate = true;
      }
      if(terminate) {
        console.error(config);
        process.exit(1);
      }
    }
  
    console.log(chalk.yellowBright.bold('predeploy.js'));
    console.log(chalk.yellowBright.bold('============'));
    

    const config = JSON.parse(await readFile(path.join(__dirname, '..', '..', '..', 'config.json')));
    let cmd = 'firebase functions:config:set ';

    for(let namespace of Object.keys(config)) {
      check(namespace, 0);
      for(let key of Object.keys(config[namespace])) {
        check(key, 1);
        // spaces and other mess might fuck this up
        cmd += `${namespace}.${key}="${config[namespace][key]}" `;
      }
    }
  
    console.log(chalk.bgBlack.greenBright(`\t$ ${cmd}`));
  
    const { stdout, stderr } = await exec(cmd);
    console.log(stdout);
    console.log(stderr);
  
    
  
  })();