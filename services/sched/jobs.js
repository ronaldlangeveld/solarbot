var cron = require('node-cron');
const { testPower } = require('../../services/tasks/testPower');
const {allDataMessage} = require('../telegram_bot/templates');
const {sendTelegramMessage} = require('../telegram_bot/index');

const updateSolarData = cron.schedule('*/4 * * * * ', async () => {
    const {batteryLevelNow, sunPower, consumptionNow, hasChanged} = await testPower();
    const message = allDataMessage(hasChanged.isOn, batteryLevelNow, sunPower, consumptionNow);
    if(hasChanged.gridChange){
        await sendTelegramMessage(process.env.RECIPIENT_ID, message);
    }
});

module.exports = {
    updateSolarData
}