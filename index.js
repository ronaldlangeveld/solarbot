const express = require('express');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');
require('dotenv').config();
const path = require('path');
const routes = require('./routing/routes');
const {updateSolarData} = require('./services/sched/jobs');



app.use(bodyparser.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json({limit: '50mb'}));

app.use(routes());


app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});

updateSolarData.start();