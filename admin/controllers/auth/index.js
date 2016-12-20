import express from 'express';
let router = express.Router();

const pageLogin = require('./page.login');
const actionLogin = require('./action.login');
const actionLogout = require('./action.logout');

router.route('/auth/login')
    .get(pageLogin)
    .post(actionLogin);

router.route('/auth/logout')
    .get(actionLogout);

module.exports = router;
