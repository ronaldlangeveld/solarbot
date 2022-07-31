module.exports = {
    get ping () {
        return require('./ping');
    },
    get dailyCount () {
        return require('./dailyCount');
    },
    get current () {
        return require('./current');
    }
};