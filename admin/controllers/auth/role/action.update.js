import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:action.update');

module.exports = async (req, res, next) => {

    try {
        let data = req.body;

        data.UpdatedBy = req.session.adminUser._id;

        let url = `/roles/${req.params.id}`;

        let { data: role } = await axios.put(url, data);

        debug('updatedRole = %j', role);

        return res.redirect('/auth/role');

    } catch(err) {
        return next(err);
    }
};
