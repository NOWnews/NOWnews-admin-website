import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:center:action.remove');

module.exports = async (req, res, next) => {

    try {

        let UpdatedBy = req.session.adminUser._id;
        let data = {UpdatedBy};

        let url = `/centers/${req.params.id}`;

        let { data: center } = await axios.delete(url, { data });

        debug('removedCenter = %j', center);

        return res.json({ center });
    }
    catch(err) {
        return next(err);
    }
};
