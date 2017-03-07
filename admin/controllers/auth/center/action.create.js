import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth/center:action.create');

module.exports = async (req, res, next) => {

    try {

        let userId = req.session.adminUser._id;
        let { departmentId, ...data } = req.body;
        data.CreatedBy = userId;
        data.UpdatedBy = userId;
        let { data: center } = await axios.post('/centers', data);
        debug('createdCenter = %j', center);

        // Link into Department
        let url = `/departments/${departmentId}`;

        data = {
            Centers: center._id,
            UpdatedBy: userId,
        }

        let { status, statusText, data: department } = await axios.put(url, data);

        return res.redirect(`/auth/department/${departmentId}`);

    } catch(err) {
        return next(err);
    }
};
