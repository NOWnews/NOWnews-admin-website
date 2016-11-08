import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';
let router = express.Router();
const debug = require('debug')('NOWmobile:controllers:news:nearByNews');

module.exports = (req, res, next) => {
    let specialType = 'nearByNews';

    co(function*() {
        let longitude = req.query.longitude;
        let latitude = req.query.latitude;
        let nearByNewsBaseUrl = `nearByNews?longitude=${longitude}&latitude=${latitude}`;

        let result = yield [
            getApi(`category/news`),
            getApi(nearByNewsBaseUrl),
        ];

        let mainCategory = result[0];
        let { newsList, ads } = result[1];

        let data = {
            nativeAds: ads || [],
            newsList: newsList,
            mainCategory,
            specialType,
        };

        if(req.query.data === 'PLAYJJ'){
            return res.json({ data });
        }

        return res.render('home/home', data);

    }).catch(next);

};
