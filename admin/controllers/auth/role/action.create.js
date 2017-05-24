import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:action.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let { Policies, ...data} = req.body;

        if ( typeof Policies === "string") {
            Policies = [Policies];
        }

        data.CreatedBy = userId;
        data.UpdatedBy = userId;
        data.Policies = Policies;

        let { data: role } = await axios.post('/roles', data);

        debug('createdRole = %j', role);

        return res.redirect('/auth/role');

    } catch(err) {
        return next(err);
    }
};
