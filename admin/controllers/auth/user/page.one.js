import Debug from 'debug';
import { USER_STATUS } from '../../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.one');

module.exports = async (req, res, next) => {

    try {
        let { data: centerList } = await axios.get('/centers');
        let { data: roleList } = await axios.get('/roles');
        let { data: user } = await axios.get(`/users/${req.params.id}`);

        debug('user = %j', user);

        return res.render('auth/user/page.one.html', {
            centerList,
            roleList,
            user,
            USER_STATUS,
        });

    } catch(err) {
        return next(err);
    }
};
