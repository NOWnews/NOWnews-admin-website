import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:page.edit');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/auth/department';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let { data: department } = await axios.get(`/departments/${req.params.id}`);

        debug('department = %j', department);

        return res.render('auth/department/page.edit.html', {
            department,
        });

    } catch (err) {
        return next(err);
    }
};
