import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth/department:action.create');

module.exports = async (req, res, next) => {

    try {

        let userId = req.session.adminUser._id;
        let { centerId, ...data } = req.body;
        data.CreatedBy = userId;
        data.UpdatedBy = userId;
        let { data: department } = await axios.post('/departments', data);
        debug('createdDepartment = %j', department);

        // Link into Center
        let url = `/centers/${centerId}`;

        data = {
            Departments: department._id,
            UpdatedBy: userId,
        }

        console.log(data);

        let { status, statusText, data: center } = await axios.put(url, data);

        console.log(status, statusText,  center);

        return res.redirect(`/auth/center/${centerId}`);

    } catch(err) {
        return next(err);
    }
};
