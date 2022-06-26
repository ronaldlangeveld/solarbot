const axios = require('axios');
const { getLatestAccessToken } = require('../../utils/db/queries/getLatestAccessToken');
const db = require('../../db/index');

const getAccessToken = async () => {

    const latestAccessToken = await getLatestAccessToken();

    if(!latestAccessToken?.access || latestAccessToken?.expires < Date.now()) {
        const url = `https://${process.env.SOLARMAN_BASE_API}/account/v1.0/token?appId=${process.env.APP_ID}&language=en&=`;
        const headers = {
            'Content-Type': 'application/json',
        }
        const body = {
            "appSecret": process.env.APP_SECRET,
            "email": process.env.EMAIL,
            "password": process.env.PASSWORD,
        }
    
        const data = await axios.post(url, body, {
            headers: headers
        }).then(async(res) => {
            let expires_in = res.data.expires_in*1000 + Date.now();
           await db('tokens').insert({
                access: res?.data?.access_token,
                refresh: res?.data?.refresh_token,
                expires: expires_in
            });
            return res?.data?.access_token;
        });
    
        return data;

    } else {
        return latestAccessToken?.access
    }

};


module.exports = {
    getAccessToken,
}