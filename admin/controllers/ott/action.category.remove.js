import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:action.remove');

module.exports = async (req, res, next) => {

    try {
        let { id } = req.params;
        let UpdatedBy = req.session.adminUser._id;
        let data = {UpdatedBy};
        let { data: ott } = await axios.delete(`/ott/categories/${id}`, { data });

        debug('removedOttNameCategory = %j', ott);

        return res.json({ ott });

    }
    catch(err) {
        return next(err);
    }
};
