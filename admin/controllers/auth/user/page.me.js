import { USER_STATUS } from '../../../util/constants';
import Debug from 'debug';
import Promise from 'bluebird';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.me');

module.exports = async function(req, res, next) {
    try {

        let userId = req.session.adminUser._id;

        let [
            { data: user },
            { data: { users: userList, pageData } }
        ] = await Promise.all([
            axios.get(`/users/${userId}`),
            axios.get('/users?limit=10000')
        ]);

        debug('currentUser = %j', user);


        return res.render('auth/user/page.me.html', {
            user,
            userList,
            USER_STATUS,
        });

    } catch(err) {
        return next(err);
    }
};
