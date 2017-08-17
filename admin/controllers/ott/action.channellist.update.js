import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:action.update');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;

        data.UpdatedBy = userId;

        debug('req.body = %j', data);

        let { data: ott } = await axios.put(`/ott/weight`, data);
        return res.json(ott);

    }
    catch(err) {
        return next(err);
    }
};
