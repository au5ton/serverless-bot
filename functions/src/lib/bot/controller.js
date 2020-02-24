const config = require('../config')
const chalk = require('chalk')
const fetch = require('node-fetch')

module.exports.getBot = () => {
    const Telegraf = require('telegraf')
    const bot = new Telegraf(config.telegram.bot_token, {
        telegram: { webhookReply: true }
    })

    bot.command('start', ctx => {
        return ctx.reply('Hello from Cloud Function')
    })

    return bot
}

module.exports.getMe = async (req, res) => {
    const bot = module.exports.getBot()

    let me = await bot.telegram.getMe()
    return res.json(me)
}

module.exports.setWebhook = async (req, res) => {
    const bot = module.exports.getBot()

    try {
        await bot.telegram.setWebhook(`https://${config.gcp.datacenter}-${config.gcp.project_id}.cloudfunctions.net/api/bot/${config.telegram.webhook_secret}`);
        return res.json({
            status: 'success',
            message: ''
        })
    }
    catch(err) {
        return res.json({
            status: 'failure',
            message: 'stacktrace'
        })
    }
}

module.exports.getWebhook = async () => {
    let res = await fetch(`https://api.telegram.org/bot${config.telegram.bot_token}/getWebhookInfo`)
    return await res.json()
}

module.exports.handleWebhook = async (req, res) => {
    const bot = module.exports.getBot()
    console.log(`POST /${config.telegram.webhook_secret} : Webhook handled`)
    await bot.handleUpdate(req.body, res)
}

module.exports.startPolling = async () => {
    const bot = module.exports.getBot()

    console.log(chalk.yellowBright('Starting bot with polling, disabling webhook...'))

    await bot.telegram.setWebhook('')

    await bot.launch()

    return bot
}