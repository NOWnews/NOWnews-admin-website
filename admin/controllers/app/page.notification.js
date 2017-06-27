import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:app:page.notification');

import Promise from 'bluebird';

module.exports = async (req, res, next) => {
    try{
        return res.render('app/page.notification.html');
    }
    catch(err) {
        return next(err);
    }
};