const {clientLoader} = require('../../clientLoader');

const view = async (req, res) => {
    res.sendFile(clientLoader());
};

module.exports = {
    view
}