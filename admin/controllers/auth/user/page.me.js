import { USER_STATUS } from '../../../util/constants';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.me');

module.exports = async function(req, res, next) {
    try {

        let userId = req.session.adminUser._id;

        let { data: user } = await axios.get(`/users/${userId}`);

        let { data: menuList } = await axios.get('/menus?level=0');

        debug('currentUser = %j', user);


        return res.render('auth/user/page.me.html', {
            user,
            menuList,
            USER_STATUS,
        });

    } catch(err) {
        return next(err);
    }
};
