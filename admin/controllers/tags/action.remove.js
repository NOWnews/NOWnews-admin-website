import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:tags:action.remove');

module.exports = async (req, res, next) => {

    try {
        let { tagId } = req.params;

        let { data: tags } = await axios.delete( `/tags/${tagId}` );

        debug('removedTags = %j', tags);

        return res.json({ tags });

    }
    catch(err) {
        return next(err);
    }
};
