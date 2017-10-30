import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:app:page.notification');

import Promise from 'bluebird';

module.exports = async (req, res, next) => {
    try{

        const { sn } = req.query;
        let news = null;
        if (sn) {
            const result = await axios.get(`/news/oneBySn/${sn}`);
            news = result.data;
        }
        return res.render('app/page.notification.html', {
            news,
        });
    }
    catch (err) {
        return next(err);
    }
};