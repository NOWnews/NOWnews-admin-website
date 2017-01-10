import co from 'co';
import express from 'express';
// import api from '../util/api';
let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:home');
// 驗證是否登入
const isLogin = require('../middlewares/isLogin');

router.route('/')
    .get(isLogin, (req, res, next) => {
        return res.render('home/index');
        // co(function*() {
            //
            // let result = yield [
            //     api('category/news'),
            //     api('news/headline'),
            // ];

            // let mainCategory = result[0];
            // let { newsList, ads } = result[1];
            //
            // if(req.query.data === 'PLAYJJ'){
            //     return res.json({ newsList });
            // }
            //
            // return res.render('home/home', {
            //     nativeAds: ads || [],
            //     newsList,
            //     mainCategory,
            //     specialType: 'headline',
            // });

        // }).catch(next);

    });

module.exports = router;
