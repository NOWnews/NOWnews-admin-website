import co from 'co';
import _ from 'lodash';

const debug = require('debug')('NOWadmin:admin:middlewares:checkUserData');

module.exports = async (req, res, next) => {
    try {

        const { session, path } = req;

        const isLogin = (session && session.adminUser);

        const allowPath = ['/auth/login', '/auth/logout', '/robots.txt'];

        if (!isLogin || _.indexOf(allowPath, path) !== -1) {
            return next();
        }
        
        const { data: user } = await axios.get(`/users/${session.adminUser._id}`);

        const isLeaving = user.status === 'LEAVING' || user.status === 'SUSPENDED';

        if (isLeaving) {
            return res.redirect('/auth/login');
        }

        return next();

    } catch (err) {
        return next(err);
    }
};
