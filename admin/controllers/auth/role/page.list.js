import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:page.list');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/auth/role';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let { data: roleList } = await axios.get('/roles');

        debug('roleList = %j', roleList);

        return res.render('auth/role/page.list.html', {
            roleList,
        });
    }
    catch(err) {
        return next(err);
    }
};
