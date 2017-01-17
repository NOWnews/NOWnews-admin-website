import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:action.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;
        data.CreatedBy = userId;
        data.UpdatedBy = userId;

        if (data.Center === "") {
            delete data.Center;
        }

        if (data.Department === "") {
            delete data.Department;
        }

        if (data.Role === "") {
            delete data.Role;
        }

        console.log(data);

        let { data: user } = await axios.post('/users', data);

        debug('createdUser = %j', user);

        return res.redirect(`/auth/user/${user._id}`);

    } catch(err) {
        return next(err);
    }
};
