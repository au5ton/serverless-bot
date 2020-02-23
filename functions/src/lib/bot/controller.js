const config = require('../config')

const Telegraf = require('telegraf')
const bot = new Telegraf(config.telegram.bot_token, {
    telegram: { webhookReply: true }
})

bot.command('start', ctx => {
    return ctx.reply('Hello from Cloud Function')
})

module.exports.getMe = async (req, res) => {
    let me = await bot.telegram.getMe()
    return res.json(me)
}

module.exports.setHook = async (req, res) => {
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

module.exports.webhook = async (req, res) => {
    console.log('POST /webhook')
    await bot.handleUpdate(req.body, res)
}
