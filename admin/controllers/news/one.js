import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:news');

module.exports = (req, res, next) => {
    let { newsId } = req.params;

    if (isNaN(newsId)) {
        return res.redirect('/');
    }

    co(function*() {

        let news = yield getApi(`news/${newsId}`);

        debug('news = %j', news);

        let result = yield [
            getApi(`news/headline`),
            getApi('category/news')
        ];

        // record query params
        let queryParams = '';
        if(req.query.from){
            queryParams = `?from=${req.query.from}`;
        }
        if(req.query.utm_source){
            queryParams = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
        }

        let { newsList } = result[0];

        let mainCategory = result[1];

        let data = {
            news,
            mainCategory,
            headline: newsList,
            queryParams: queryParams
        };

        if(req.query.data === 'PLAYJJ'){
            return res.json( data );
        }

        return res.render('news/one', data);

    }).catch(next);
};
