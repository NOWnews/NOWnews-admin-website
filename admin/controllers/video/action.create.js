import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:video:action.create');

module.exports = async (req, res, next) => {

    try {

        let { data: { video } } = await axios.post(`/video/upload`);

        debug('video = %j', video);

        return res.json({ video });
    }
    catch(err) {
        return next(err);
    }
};
