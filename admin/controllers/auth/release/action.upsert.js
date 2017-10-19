import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:action.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;
        data.CreatedBy = userId;
        data.UpdatedBy = userId;

        let { data: department } = await axios.post('/departments', data);

        debug('createdDepartment = %j', department);

        return res.redirect(`/auth/department/${department._id}`);
    } catch(err) {
        return next(err);
    }
};
