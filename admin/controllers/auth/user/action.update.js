import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:action.update');

module.exports = async (req, res, next) => {

    try {

        let data = req.body;

        data.UpdatedBy = req.session.adminUser._id;

        let url = `/users/${req.params.id}`;

        let { data: user } = await axios.put(url, data);

        if (data.defaultMenu === "") {
            data.defaultMenu = null ;
        }

        if (data.Department === "") {
            delete data.Department;
        }

        if (data.Center === "") {
            delete data.Center;
        }

        if (data.Role === "") {
            delete data.Role;
        }

        debug('updatedUser = %j', user);

        return res.redirect(`/auth/user/${user._id}`);

    } catch(err) {
        return next(err);
    }
};
