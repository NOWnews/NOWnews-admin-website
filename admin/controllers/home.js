import co from 'co';
import express from 'express';
import getApi from '../util/getApi';
let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:home');


router.route('/')
    .get((req, res, next) => {
        return res.render('home/home');
        // co(function*() {
            //
            // let result = yield [
            //     getApi('category/news'),
            //     getApi('news/headline'),
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
