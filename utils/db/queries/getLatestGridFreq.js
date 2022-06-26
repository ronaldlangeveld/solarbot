const db = require('../../../db/index');

const getLatestGridFrequency = async (compare) => {
    try {
        const LatestFrequency = await db('grid_status').orderBy('timestamp', 'desc').first();
        return LatestFrequency;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getLatestGridFrequency
}