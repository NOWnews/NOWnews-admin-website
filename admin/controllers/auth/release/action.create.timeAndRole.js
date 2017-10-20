import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:action.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;
        data.CreatedBy = userId;
        data.UpdatedBy = userId;

        let { data: releaseRules } = await axios.post('/releaseRules/timeAndRole', data);

        console.log('@@............');
        return res.redirect(`/auth/release`);
    } catch(err) {
        return next(err);
    }
};
