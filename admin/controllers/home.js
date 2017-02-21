import co from 'co';
import express from 'express';
let router = express.Router();

const debug = require('debug')('NOWnews-admin-website:controllers:home');

router.route('/')
    .get((req, res, next) => {
        return res.render('home/index');
    });

module.exports = router;
