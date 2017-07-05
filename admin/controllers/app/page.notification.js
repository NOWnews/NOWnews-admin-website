import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:app:page.notification');

import Promise from 'bluebird';

module.exports = async (req, res, next) => {
    try{
        let checkPath = '/app/notification';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        return res.render('app/page.notification.html');
    }
    catch(err) {
        return next(err);
    }
};
