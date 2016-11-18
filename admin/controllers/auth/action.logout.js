const debug = require('debug')('NOWnewsAdmin:controllers:auth:action.logout');

module.exports = function(req, res, next) {
    // 現在沒有 session 會有 error
    // debug('req.session.user = %j', req.session.user);

    req.session = null;

    return res.redirect('/login');
};
