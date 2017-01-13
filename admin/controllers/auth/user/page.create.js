import { USER_STATUS } from '../../../util/constants';
module.exports = async (req, res, next) => {

    try {
        let { data: centerList } = await axios.get('/centers');
        // let { data: roleList } = await axios.get('/roles');
        let roleList = [];

        return res.render('auth/user/page.create.html', {
            roleList,
            centerList,
            USER_STATUS,
        });

    } catch(err) {
        return next(err);
    }
};
