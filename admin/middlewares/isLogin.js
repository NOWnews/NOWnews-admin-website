import co from 'co';
import _ from 'lodash';

const debug = require('debug')('NOWadmin:admin:middlewares:isLogin');

module.exports = function(req, res, next) {
    const { path, session } = req;
    const isLogin = (session && session.adminUser);

    const allowPath = ['/auth/login', '/auth/logout', '/robots.txt'];

    if (_.indexOf(allowPath, path) === -1 && !isLogin) {
        return res.redirect('/auth/login');
    }

    return next();
};
