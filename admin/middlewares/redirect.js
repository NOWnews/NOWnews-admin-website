/*
 * 這個 middleware 是因為怕有人從舊的網址進入，所以要 redirect 到新網址
 */

import chalk from 'chalk';

module.exports = (app) => {

    return (req, res, next) => {

        // 舊的 url 網址格式
        let newsMatches = req.path.match(/\/n\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/([0-9]+)/);
        let videoMatches = req.path.match(/\/v\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/([0-9]+)/);

        let queryString = '';
        if(req.query && req.query.from) {
            queryString = `?from=${req.query.from}`;
        }

        if(req.query && req.query.utm_source) {
            queryString = `?utm_source=${req.query.utm_source}&utm_medium=${req.query.utm_medium}&utm_campaign=${req.query.utm_campaign}`;
        }

        // 有符合到舊的新聞內頁格式就直接 redirect
        if(newsMatches !== null && newsMatches.length > 0) {
            let originUrl = newsMatches[0];
            let nodeId = newsMatches[4];
            console.log(chalk.blue.bold(`原網址 "${originUrl}" -------> 導轉 "/news/${nodeId}"`));
            return res.redirect(`/news/${nodeId}${queryString}`);
        }

        // 有符合到舊的影音內頁格式就直接 redirect
        if(videoMatches !== null && videoMatches.length > 0) {
            let originUrl = videoMatches[0];
            let nodeId = videoMatches[4];
            console.log(chalk.blue.bold(`原網址 "${originUrl}" -------> 導轉 "/video/${nodeId}"`));
            return res.redirect(`/video/${nodeId}${queryString}`);
        }

        return next();
    };
};
