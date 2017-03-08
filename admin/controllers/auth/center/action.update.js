import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:center:action.update');

module.exports = async (req, res, next) => {

    try {
        let data = req.body;
        data.UpdatedBy = req.session.adminUser._id;

        let url = `/centers/${req.params.id}`;

        let { data: center } = await axios.put(url, data);

        debug('updatedCenter = %j', center);

        return res.json({ center });
    }
    catch(err) {
        return next(err);
    }
};
