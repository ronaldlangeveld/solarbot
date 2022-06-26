const axios = require('axios');


const stages = async(data) => {
    switch (data) {
        case 1:
            return 'No Load Shedding';
        case 2:
            return 'Stage 1';
        case 3:
            return 'Stage 2';
        case 4:
            return 'Stage 3';
        case 5:
            return 'Stage 4';
        case 6:
            return 'Stage 5';
        case 7:
            return 'Stage 6';
        case 8:
            return 'Stage 7';
        case 9:
            return 'Stage 8';
    }
};

const getLoadsheddingStatus = async () => {
    const url = `https://loadshedding.eskom.co.za/LoadShedding/GetStatus`;
    
    const data = await axios.get(url).then(async(res) => {

        return {
            status: stages(res.data),
            raw: res.data
        }
    }
    ).catch((error) => {
        console.log(error);
    }
    );

    return data;
};


module.exports = {
    getLoadsheddingStatus
}