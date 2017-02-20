import co from 'co';

const debug = require('debug')('NOWadmin:admin:middlewares:isLogin');

module.exports = function(req, res, next) {
    let isLogin = (req.session && req.session.adminUser);

    if ((req.path !== '/auth/login' && req.path !== '/auth/logout' ) && !isLogin) {
        return res.redirect('/auth/login');
    }

    return next();
};
