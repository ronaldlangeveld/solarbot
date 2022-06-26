const {getAccessToken} = require('./accessToken');
const axios = require('axios');

const getGridStatus = async() => {

    const accessToken = await getAccessToken();
    const url = `https://${process.env.SOLARMAN_BASE_API}/device/v1.0/currentData?appId=${process.env.APP_ID}&language=en&=`;
    const headers = {
        "Content-Type": "application/json",
        "authorization": `bearer ${accessToken}`
    }
    const body = {
        deviceSn : process.env.DEVICE_SERIAL
    }
    const data = await axios.post(url, body, {
        headers: headers
    }).then(async(res) => {
        return res?.data;
    }
    ).catch((error) => {
        console.log(error);
        return error;
    }
    );

    return data?.dataList;

}

module.exports = {
    getGridStatus
}