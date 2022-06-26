const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token);

const sendTelegramMessage = async(message) => {
   return await bot.sendMessage(process.env.RECIPIENT_ID, message, {parse_mode: 'html'});
};

module.exports = {
    sendTelegramMessage
}