import express from 'express';
import getApi from '../util/getApi';
let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:home');


router.route('/login')
    .get((req, res, next) => {
        return res.render('login/index');
    });

module.exports = router;
