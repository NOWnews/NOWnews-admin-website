import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:action.remove');

module.exports = async (req, res, next) => {

    try {

        let data = {
            UpdatedBy: req.session.adminUser._id,
        };

        let url = `/users/${req.params.id}`;

        let { data: user } = await axios.delete(url, { data });

        debug('removedUser = %j', user);

        return res.json({ user });

    } catch(err) {
        return next(err);
    }
};
