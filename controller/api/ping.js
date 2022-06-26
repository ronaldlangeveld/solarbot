const {testPower} = require('../../services/solarman_api/testPower');

const view = async (req, res) => {
        await testPower().then((response) => {
        return res.send(response);
    }).catch((error) => {
        console.log(error);
    })

    
}

module.exports = {
    view
}