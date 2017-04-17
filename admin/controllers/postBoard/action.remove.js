import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:postBoard:action.remove');

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let { data: removedPost } = await axios.delete( `/postBoard/${id}` );

        debug('removedRemovedPost = %j', removedPost);

        return res.json({ removedPost });

    } catch(err) {
        return next(err);
    }

};
