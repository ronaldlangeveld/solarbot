const db = require('../../../db/index');
const {DateTime} = require("luxon");
var _ = require('lodash');

function convertDate(value){
    let d = new Date(value?.timestamp);
    return d;
 }

const getOutagesCount = async () => {

    try {

        const outages = await db('grid_status').select('timestamp').where('status', '=', 0).groupBy('timestamp').orderBy('timestamp', 'asc');

        const outStamps = outages.map(convertDate);
        const total = [];
        
        const groups = outStamps.map((stamp, index) => {
            const dt = DateTime.fromISO(stamp.toISOString());
            const date = dt.toISODate();
            total.push({date: date});
        });

        const grouped = _(total).groupBy('date').map((items, key) => ({date: key, count: items.length})).value();

        return grouped;

    } catch (error) {
        return error;
    }
}

module.exports = {
    getOutagesCount
};