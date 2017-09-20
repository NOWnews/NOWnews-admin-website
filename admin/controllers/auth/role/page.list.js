import Debug from 'debug';
import _ from 'lodash';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:page.list');

module.exports = async (req, res, next) => {

    try {

        let { data: roleList } = await axios.get('/roles');

        debug('roleList = %j', roleList);

        return res.render('auth/role/page.list.html', {
            roleList,
            roleMapping: _.keyBy(roleList, '_id')
        });
    }
    catch(err) {
        return next(err);
    }
};
