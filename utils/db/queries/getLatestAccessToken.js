const db = require('../../../db/index');

const getLatestAccessToken = async() => {
    try {
        const latestAccessToken = await db('tokens').orderBy('expires', 'desc').first();
        return latestAccessToken;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getLatestAccessToken
}