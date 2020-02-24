const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const chalk = require('chalk')
const config = require('./lib/config')

app.use(cors({ origin: true }))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }));

app.use('/bot', require('./lib/bot/route'))

app.get('*', (_, res) => res.status(404).json({ success: false, data: 'Endpoint not found'}))
module.exports = app

if(!module.parent) {
   (async () => {
      // this is the main module
      const ON_DEATH = require('death')
      const ArgumentParser = require('argparse').ArgumentParser
      let parser = new ArgumentParser({
         version: config.package.version,
         addHelp: true,
         description: config.package.description
      })
      parser.addArgument('--polling', { 
         action: 'storeTrue',
         help: 'Use to run locally with polling instead of through webhooks' 
      })
      const args = parser.parseArgs()

      if(args.polling) {
         const controller = require('./lib/bot/controller')
         let bot = await controller.startPolling()
         console.log('done')
         
         ON_DEATH(async (signal, err) => {
            console.log(chalk.yellowBright('Process death signal received, stopping the bot...'))
            await bot.stop();
            console.log('Resetting the webhook to production...')
            // supply a "fake" Express.js response object
            await controller.setWebhook(null, {json:()=>{}})
            let info = await controller.getWebhook()
            console.log(info.ok ? info.result.url : info)
            console.log('Goodbye')
         })
      }
   })();
}