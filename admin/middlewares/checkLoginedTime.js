import config from 'config';
import moment from 'moment-timezone';

const debug = require('debug')('NOWadmin:admin:middlewares:checkLoginedTime');

module.exports = function(req, res, next) {

    const { method, path, session } = req;

    const isLogin = (session && session.adminUser);

    if (!isLogin || method !== 'GET' || path === '/auth/logout') {
        return next();
    }

    let { loginedTime }  = session.adminUser;

    let expiredDay = config.get('expiredDay');

    let expiredTime = moment.tz(loginedTime,'Asia/Taipei').add(expiredDay, 'days');

    if (moment.tz('Asia/Taipei').isAfter(expiredTime)) {
        return res.redirect('/auth/logout');
    }

    return next();

};
