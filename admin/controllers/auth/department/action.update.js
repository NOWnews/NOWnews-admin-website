import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:action.update');

module.exports = async (req, res, next) => {

    try {
        let data = req.body;

        data.UpdatedBy = req.session.adminUser._id;

        let url = `/departments/${req.params.id}`;

        let { data: department } = await axios.put(url, data);

        debug('updatedDepartment = %j', department);

        return res.redirect(`/auth/department/${department._id}`);

    } catch(err) {
        return next(err);
    }
};
