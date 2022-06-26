const { getGridStatus } = require('../solarman_api/getGridStatus');
const { getLatestGridFrequency } = require('../../utils/db/queries/getLatestGridFreq');
const db = require('../../db/index');
// const { getLoadsheddingStatus } = require('../eskom/loadSheddingStatus');
const e = require('express');


const testPower = async () => {

    const status = await getGridStatus().then((res) => {
        return res;
    });

    const gridFrequencyNow = status.find(status => status.name === 'Grid Frequency');
    const batteryLevelNow = status.find(status => status.name === 'SoC');
    const sunPower = status.find(status => status.name === 'Total DC Input Power');
    const consumptionNow = status.find(status => status.name === 'Total Consumption Power');
    const gridFrequencyLatest = await getLatestGridFrequency();
    const hasChanged = {
        gridChange: false,
        isOn: true,
    }

    if (!gridFrequencyLatest || +(gridFrequencyNow?.value) !== +(gridFrequencyLatest?.status)) {

        await db('grid_status').insert({
            status: gridFrequencyNow.value,
            timestamp: Date.now(),
            battery_level: +(batteryLevelNow?.value) || 0
        });

        if(+(gridFrequencyLatest?.status) === 0 && +(gridFrequencyNow?.value) > 0){
            hasChanged.gridChange = true;
            hasChanged.isOn = false;
        }
        if(+(gridFrequencyLatest?.status) !== 0 && +(gridFrequencyNow?.value) === 0){
            hasChanged.gridChange = true;
            hasChanged.isOn = false;
        }

    }

    return {
        gridFrequencyNow,
        batteryLevelNow,
        sunPower,
        consumptionNow,
        gridFrequencyLatest,
        hasChanged
    }
}

module.exports = {
    testPower
}