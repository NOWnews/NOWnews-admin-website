import Promise from 'bluebird';
import { USER_STATUS } from '../../../util/constants';

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/auth/user';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

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
