import sm from 'sitemap';
import co from 'co';
import Promise from 'bluebird';
import _ from 'lodash';

import getApi from '../../util/getApi';

module.exports = (req, res, next) => {

    co(function*() {

        // 從 api 取得 sitemap 的資料
        let sitemapData = yield getApi('sitemap/google');

        if(!sitemapData || sitemapData.length === 0) {
            return yield Promise.reject(new Error('sitemap api 找不到資料.....'));
        }

        // sitemap 資料處理
        let urls = _.map(sitemapData, (data) => {
            return {
                url: data.url,
                changefreq: data.changefreq,
                priority: data.priority,
                lastmodISO: data.lastmod
            };
        });

        // sitemap 資料初始化
        let optinos = {
            hostname: 'http://m.nownews.com',
            cacheTime: 600000,
            urls: urls
        };

        let sitemap = sm.createSitemap(optinos);

        // 轉換成 sitemap xml
        let sitemapXML = yield new Promise(function(resolve, reject) {
            sitemap.toXML(function(err, xml) {
                if (err) {
                    return reject(err);
                }
                return resolve(xml);
            });
        });

        res.header('Content-Type', 'application/xml');
        return res.send(sitemapXML);
    })
    .catch(next);
};