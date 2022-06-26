const {testPower} = require('../../services/tasks/testPower');

const view = async (req, res) => {
        await testPower().then((response) => {
        return res.send(response);
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = {
    view
}