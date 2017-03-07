import Promise from 'bluebird';
import { USER_STATUS } from '../../../util/constants';

module.exports = async (req, res, next) => {

    try {
        let [
            { data: departmentList },
            { data: roleList },
            { data: menuList }
        ] = await Promise.all([
            axios.get('/departments'),
            axios.get('/roles'),
            axios.get('/menus?level=0')
        ]);

        return res.render('auth/user/page.create.html', {
            departmentList,
            menuList,
            roleList,
            USER_STATUS,
        });

    } catch(err) {
        return next(err);
    }
};
