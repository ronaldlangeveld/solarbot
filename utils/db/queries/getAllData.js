const db = require('../../../db/index');

const getAllGridData = async () => {
    try {
        const allData = await db('grid_status').orderBy('timestamp', 'desc');
        return allData;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllGridData
}