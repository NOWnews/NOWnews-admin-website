import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:action.logout');

module.exports = function(req, res, next) {
    debug('req.session.adminUser = %j', req.session.adminUser);

    req.session = null;

    return res.redirect('/auth/login');
};
