import co from 'co';
import express from 'express';
let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:home');
// 驗證是否登入
const isLogin = require('../middlewares/isLogin');

router.route('/')
    .get(isLogin, (req, res, next) => {
        return res.render('home/index');
    });

module.exports = router;
