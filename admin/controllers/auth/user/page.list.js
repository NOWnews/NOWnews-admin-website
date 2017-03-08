import Debug from 'debug';
import Promise from 'bluebird';
import { USER_STATUS } from '../../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.list');

module.exports = async (req, res, next) => {

    try {
        let query = req.query;

        let queryString = req._parsedUrl.query;

        if (queryString === null) {
            queryString = "";
        }

        let [
            { data: departmentList },
            { data: roleList },
            { data: { users: userList, pageData } }
        ] = await Promise.all([
            axios.get('/departments'),
            axios.get('/roles'),
            axios.get(`/users?${queryString}`)
        ]);

        debug('userList = %j', userList);

        return res.render('auth/user/page.list.html', {
            departmentList,
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
