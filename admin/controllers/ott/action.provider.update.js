import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:provider:action.update');

module.exports = async (req, res, next) => {

    try {

        let { providerId } = req.params
        let userId = req.session.adminUser._id;
        let data = req.body;
        console.log(123)

        data.UpdatedBy = userId;

        debug('req.body = %j', data);

        let { data: ottinfo } = await axios.put(`/ott/providers/${providerId}`, data);

        debug('updatedMenu = %j', ottinfo);

        return res.redirect(`/ott/providers/${providerId}`);

    }
    catch(err) {
        return next(err);
    }
};
