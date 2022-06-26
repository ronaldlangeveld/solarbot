

const allDataMessage = (status, batteryLevelNow, sunPower, consumptionNow) => {
    return `${status ? `⚡️ POWER IS ON` : `🚨 POWER IS OFF`} \n\n🔋 at ${batteryLevelNow?.value}%\n\n ☀️ Producing ${+(sunPower?.value) / 1000} kW \n\n 🏡 Current Consumption ${+(consumptionNow?.value) / 1000} kW`
}

module.exports = {
    allDataMessage
}