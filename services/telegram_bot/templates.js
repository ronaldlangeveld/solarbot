const allDataMessage = (status, batteryLevelNow, sunPower, consumptionNow) => {
    return `${status ? `ā”ļø POWER IS ON` : `šØ POWER IS OFF`} \n\nš at ${batteryLevelNow?.value}%\n\n āļø Producing ${+(sunPower?.value) / 1000} kW \n\n š” Current Consumption ${+(consumptionNow?.value) / 1000} kW`
}

module.exports = {
    allDataMessage
}