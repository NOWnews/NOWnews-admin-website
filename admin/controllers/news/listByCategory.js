import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();


const debug = require('debug')('NOWmobile:controllers:news:category');

module.exports = (req, res, next) => {
    let { taxId } = req.params;

    if (!taxId) {
        return next();
    }

    co(function*() {
        let categoryBaseUrl = 'category/news';

        let result = yield [
            getApi(categoryBaseUrl),
            getApi(`${categoryBaseUrl}/${taxId}`),
        ];

        let mainCategory = result[0];
        let { newsList, ads } = result[1];

        if(req.query.data === 'PLAYJJ'){
            return res.json({ newsList });
        }
        return res.render('home/home', {
            nativeAds: ads || [],
            newsList,
            mainCategory,
            taxId,
        });

    }).catch(next);

};
