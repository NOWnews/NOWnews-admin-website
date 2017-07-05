import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:page.list');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/auth/department';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let { data: departmentList } = await axios.get('/departments');

        debug('departmentList = %j', departmentList);

        return res.render('auth/department/page.list.html', {
            departmentList,
        });

    } catch(err) {
        return next(err);
    }
};
