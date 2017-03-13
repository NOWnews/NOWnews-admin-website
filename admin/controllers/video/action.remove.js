import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:video:action.remove');

module.exports = async (req, res, next) => {

    try {
        let url = `/videos/${req.params.id}`;
        let data = {
            UpdatedBy: req.session.adminUser._id,
        };

        let { data: video } = await axios.delete(url, {data});

        debug('removedVideo = %j', video);

        return res.json({ video });
    } catch(err) {
        return next(err);
    }
};
