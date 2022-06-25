const {Router} = require('express');
const api = require('../controller').api

module.exports = function routes() {
    const router = Router();
    router.get('/', api.ping.view);
    return router;
}