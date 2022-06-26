var cron = require('node-cron');
const { testPower } = require('../../services/tasks/testPower');

const updateSolarData = cron.schedule('*/4 * * * * ', async () => {
    await testPower();
});

module.exports = {
    updateSolarData
}