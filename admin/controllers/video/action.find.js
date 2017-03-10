import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:video:action.find');

module.exports = async (req, res, next) => {

    try {

        let queryString = req._parsedUrl.query;

        if (queryString === null) {
            queryString = "";
        }

        let { data: { video } } = await axios.get(`/video?limit=24&${queryString}`);

        debug('image = %j', video);

        return res.json({ video });
    }
    catch(err) {
        return next(err);
    }
};
