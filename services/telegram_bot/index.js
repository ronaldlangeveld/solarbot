const {testPower} = require('../tasks/testPower');
const TelegramBot = require('node-telegram-bot-api');
const {allDataMessage} = require('./templates');
const {getAllGridData} = require('../../utils/db/queries/getAllData');

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

  bot.onText(/\/debug/, async(msg, match) => {
    const chatId = msg.chat.id;
    const status = await testPower();
    await sendTelegramMessage(chatId, JSON.stringify(status));
  });

  bot.onText(/\/outages/, async(msg, match) => {
    const chatId = msg.chat.id;
    const allData = await getAllGridData();

    const outages = allData.filter(data => data.status === 0);
    const last = outages.at(-1)?.timestamp;
    const message = `📊 ${outages.length} outages since ${new Date(last).toLocaleString()}`;
    
    await sendTelegramMessage(chatId, message);
  });
  
module.exports = {
    sendTelegramMessage
}