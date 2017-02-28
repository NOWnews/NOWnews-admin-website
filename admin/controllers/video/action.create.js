import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:video:action.create');

module.exports = async (req, res, next) => {

    try {

        let queryString = req._parsedUrl.query;

        if (queryString === null) {
            queryString = "";
        }

        let { data: { video } } = await axios.post(`/video/upload?limit=24&${queryString}`);

        debug('video = %j', video);

        return res.json({ video });
    }
    catch(err) {
        return next(err);
    }
};
