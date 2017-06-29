import { USER_STATUS } from '../../../util/constants';
import Debug from 'debug';
import Promise from 'bluebird';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.me');

module.exports = async function(req, res, next) {
    try {

        let userId = req.session.adminUser._id;

        let [
            { data: user },
            { data: { users: userList, pageData } },
            { data: menuList },
        ] = await Promise.all([
            axios.get(`/users/${userId}`),
            axios.get('/users?limit=10000'),
            axios.get('/menus?level=0'),
        ]);

        debug('currentUser = %j', user);

        // 紀錄更新完要回去的網址
        req.session.prevUrl = req.headers.referer;

        return res.render('auth/user/page.me.html', {
            menuList,
            user,
            userList,
            USER_STATUS
        });

    } catch(err) {
        return next(err);
    }
};
