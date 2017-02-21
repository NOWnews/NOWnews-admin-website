import { USER_STATUS } from '../../../util/constants';
module.exports = async (req, res, next) => {

    try {
        let { data: centerList } = await axios.get('/centers');
        let { data: roleList } = await axios.get('/roles');
        let { data: menuList } = await axios.get('/menus?level=0');

        return res.render('auth/user/page.create.html', {
            centerList,
            menuList,
            roleList,
            USER_STATUS,
        });

    } catch(err) {
        return next(err);
    }
};
