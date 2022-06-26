const {testPower} = require('../tasks/testPower');
const TelegramBot = require('node-telegram-bot-api');
const {allDataMessage} = require('./templates');

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, {polling: true});

const sendTelegramMessage = async(id, message) => {
   return await bot.sendMessage(id || process.env.RECIPIENT_ID, message, {parse_mode: 'html'});
};

bot.onText(/\/now/, async(msg, match) => {
    const chatId = msg.chat.id;
    const {batteryLevelNow, sunPower, consumptionNow, hasChanged} = await testPower();
    const message = allDataMessage(hasChanged.isOn, batteryLevelNow, sunPower, consumptionNow);
    await sendTelegramMessage(chatId, message);
  });
  

module.exports = {
    sendTelegramMessage
}