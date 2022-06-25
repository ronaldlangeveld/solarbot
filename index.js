const express = require('express');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');
require('dotenv').config();
const path = require('path');
const routes = require('./routing/routes');



app.use(bodyparser.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json({limit: '50mb'}));

// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');

// app.use('/assets', express.static(path.join('./assets')));
// app.use('/dist', express.static(path.join('./dist')));

app.use(routes());


app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});