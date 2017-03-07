import Debug from 'debug';
import Promise from 'bluebird';
import { USER_STATUS } from '../../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.edit');

module.exports = async (req, res, next) => {

    try {

        let [
            { data: departmentList },
            { data: roleList },
            { data: menuList },
            { data: user },
            { data: { users: userList } }
        ] = await Promise.all([
            axios.get('/departments'),
            axios.get('/roles'),
            axios.get('/menus?level=0'),
            axios.get(`/users/${req.params.id}`),
            axios.get('/users')
        ]);

        debug('user = %j', user);

        return res.render('auth/user/page.edit.html', {
            departmentList,
            menuList,
            roleList,
            user,
            userList,
            USER_STATUS,
        });

    } catch(err) {
        return next(err);
    }
};
