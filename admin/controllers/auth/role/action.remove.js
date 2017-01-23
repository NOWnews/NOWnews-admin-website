import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:action.remove');

module.exports = async (req, res, next) => {

    try {

        let data = {
            UpdatedBy: req.session.adminUser._id,
        };

        let url = `/roles/${req.params.id}`;

        let { data: role } = await axios.delete(url, { data });

        debug('removedRole = %j', role);

        return res.json({ role });
    } catch(err) {
        return next(err);
    }
};
