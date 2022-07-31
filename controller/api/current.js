const {getLatestGridFrequency} = require('../../utils/db/queries/getLatestGridFreq');

const view = async (req, res) => {
        await getLatestGridFrequency().then((response) => {
        return res.send(response);
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = {
    view
}