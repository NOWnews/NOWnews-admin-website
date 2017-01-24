import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:action.update');

module.exports = async (req, res, next) => {

    try {

        let data = req.body;

        let userId = req.session.adminUser._id;

        data.UpdatedBy = userId;

        let url = `/users/${userId}`;

        let { data: user } = await axios.put(url, data);

        debug('updatedUser = %j', user);

        return res.redirect(`/auth/me`);

    } catch(err) {
        return next(err);
    }
};
