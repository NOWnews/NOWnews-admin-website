import co from 'co';
import express from 'express';
import getApi from '../../util/getApi';

const debug = require('debug')('NOWmobile:controllers:video:category');

module.exports = (req, res, next) => {
    let { taxId } = req.params;

    co(function*() {

        let videoBaseUrl = `category/videos`;
        let mainCategory = yield getApi(videoBaseUrl);

        if (!taxId) {
            taxId = mainCategory[0].tid;
        }

        let videoList = yield getApi(`${videoBaseUrl}/${taxId}`);

        // 濾掉 title 上的 ▲
        videoList = _.map(videoList, (video) => {
            video.title = video.title.replace(/▲/, '');
            return video;
        });

        if(req.query.data === 'PLAYJJ'){
            return res.json({ videoList });
        }

        return res.render('video/category', {
            videoList,
            mainCategory,
            taxId,
        });

    }).catch(next);

};
