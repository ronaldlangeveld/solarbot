const {Router} = require('express');
const api = require('../controller').api
const views = require('../controller').views

module.exports = function routes() {
    const router = Router();
    router.get('/', views.client.view);
    router.get('/api/currentStatus', api.ping.view);
    router.get('/api/dailyCount', api.dailyCount.view);
    return router;
};