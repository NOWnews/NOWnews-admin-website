import Promise from 'bluebird';
import { USER_STATUS } from '../../../util/constants';

module.exports = async (req, res, next) => {

    try {
        let [
            { data: departmentList },
            { data: roleList },
            { data: menuList },
            { data: { users: userList } }
        ] = await Promise.all([
            axios.get('/departments'),
            axios.get('/roles'),
            axios.get('/menus?level=0'),
            axios.get('/users')
        ]);

        return res.render('auth/user/page.create.html', {
            departmentList,
            menuList,
            roleList,
            userList,
            USER_STATUS,
        });

    } catch(err) {
        return next(err);
    }
};
