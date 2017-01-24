import Debug from 'debug';
import { USER_STATUS } from '../../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.list');

module.exports = async (req, res, next) => {

    try {
        let query = req.query;

        let queryString = req._parsedUrl.query;

        let { data: roleList } = await axios.get('/roles');

        let { data: { users: userList, pageData } } = await axios.get(`/users?${queryString}`);

        debug('userList = %j', userList);

        return res.render('auth/user/page.list.html', {
            roleList,
            USER_STATUS,
            userList,
            pageData,
            query,
        });
    } catch(err) {
        return next(err);
    }
};
