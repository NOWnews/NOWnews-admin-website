import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:video:action.remove');

module.exports = async (req, res, next) => {

    try {

        let url = `/video/${req.params.id}`;

        let { data: video } = await axios.delete(url);

        debug('removedVideo = %j', video);

        return res.json({ video });
    } catch(err) {
        return next(err);
    }
};
