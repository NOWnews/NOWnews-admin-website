import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:auth:release:action.create.timeAndRole');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;
        data.CreatedBy = userId;
        data.UpdatedBy = userId;
        if (data.roleIds && !_.isArray(data.roleIds)) {
            data.roleIds = [data.roleIds];
        }
        let { data: releaseRules } = await axios.post('/releaseRules/timeAndRole', data);
        return res.redirect(`/auth/release`);
    } catch(err) {
        return next(err);
    }
};
