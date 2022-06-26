const {getGridStatus} = require('../solarman_api/getGridStatus');
const {getLatestGridFrequency} = require('../../utils/db/queries/getLatestGridFreq')
const db = require('../../db/index');
const {sendTelegramMessage} = require('../telegram_bot')
const {getLoadsheddingStatus} = require('../eskom/loadSheddingStatus')

const testPower = async () => {
    const status = await getGridStatus().then((res) => {
        return res;
    });

    const loadshedding = await getLoadsheddingStatus().then((res) => {
        return res;
    });
    const gridFrequencyNow = status.find(status => status.name === 'Grid Frequency');
    const batteryLevelNow = status.find(status => status.name === 'SoC');
    const sunPower = status.find(status => status.name === 'Total DC Input Power');
    const consumptionNow = status.find(status => status.name === 'Total Consumption Power');
    const gridFrequencyLatest = await getLatestGridFrequency();

    if(!gridFrequencyLatest || +(gridFrequencyNow?.value) !== +(gridFrequencyLatest?.status)) {
       
        await db('grid_status').insert({
            status: gridFrequencyNow.value,
            timestamp: Date.now(),
            loadshedding: loadshedding?.raw || 0,
            battery_level: +(batteryLevelNow?.value) || 0
        });

        const messageTemplate = (status) => (
            `${status ? `⚡️ POWER IS ON` : `🚨 POWER IS OFF`} \n\n🔋 at ${batteryLevelNow?.value}%\n\n ☀️ Producing ${+(sunPower?.value)/1000} kW \n\n 🏡 Current Consumption ${+(consumptionNow?.value)/1000} kW`
        )
        if(+(gridFrequencyLatest?.status) === 0 && +(gridFrequencyNow?.value) > 0){
            sendTelegramMessage(messageTemplate(true));
        }
        if(+(gridFrequencyLatest?.status) !== 0 && +(gridFrequencyNow?.value) === 0){
            sendTelegramMessage(messageTemplate(false));
        }
    }

    return status;
}

module.exports = {
    testPower
}