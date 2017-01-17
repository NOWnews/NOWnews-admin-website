import Debug from 'debug';
import { USER_STATUS } from '../../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.list');

module.exports = async (req, res, next) => {

    try {

        let { data: { users: userList, pageData } } = await axios.get('/users');

        debug('userList = %j', userList);

        return res.render('auth/user/page.list.html', {
            USER_STATUS,
            userList,
            pageData,
        });
    } catch(err) {
        return next(err);
    }
};
