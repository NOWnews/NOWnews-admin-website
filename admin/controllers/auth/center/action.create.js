import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:center:action.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;
        data.CreatedBy = userId;
        data.UpdatedBy = userId;

        let { data: center } = await axios.post('/centers', data);

        debug('createdCenter = %j', center);

        return res.redirect(`/auth/center/${center._id}`);
    } catch(err) {
        return next(err);
    }
};
