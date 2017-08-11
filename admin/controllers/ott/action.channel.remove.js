import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:action.remove');

module.exports = async (req, res, next) => {

    try {
        let { id } = req.params;
        let { data: ott } = await axios.delete(`/ott/channels/${id}`);

        debug('removedOttNameChannel = %j', ott);

        return res.json({ ott });

    }
    catch(err) {
        return next(err);
    }
};
