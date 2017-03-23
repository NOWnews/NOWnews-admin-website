const debug = require('debug')('NOWnewsAdmin:controllers:auth:page.login');

module.exports = function(req, res, next) {
    let user = req.cookies['_now_admin'];
    return res.render('login', {
        user
    });
};
