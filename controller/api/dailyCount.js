const {getOutagesCount} = require('../../utils/db/queries/getOutagesCount');

const view = async (req, res) => {

    const outages = await getOutagesCount();
    res.json(outages);
};

module.exports = {
    view
}