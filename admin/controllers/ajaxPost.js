import co from 'co';
import express from 'express';
import getApi from '../util/getApi';
let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:ajaxPost');


router.route('/ajaxPost')
    .get((req, res, next) => {
        let page = req.query.page;
        let url = req.query.url;
        let taxId = req.query.url.split('/').pop();

        co(function*() {
            let result = null;
            let template = null;

            if ( url.indexOf('news') > -1 ) {
                // 不直接給是因為回傳的物件裡面還有 ads
                let { newsList } = yield getApi(`category/news/${taxId}?page=${page}`);
                result = { newsList };
                template = 'newsPost';
            } else if  (url.indexOf('video') > -1 ) {
                result = {
                    videoList: yield getApi(`category/videos/${taxId}?page=${page}`)
                };
                template = 'videosPost';
            } else if ( url.indexOf('photo') > -1 ) {
                result = {
                    photoList: yield getApi(`category/photos/${taxId}?page=${page}`)
                };
                template = 'photosPost';
            }

            if(req.query.data === 'PLAYJJ'){
                return res.json(result);
            }

            return res.render(`ajaxPost/${template}`, result);

        }).catch(next);

    });

module.exports = router;
