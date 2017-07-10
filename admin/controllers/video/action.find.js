import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:video:action.find');

module.exports = async (req, res, next) => {
    try {

        let queryString = req._parsedUrl.query;

        if (queryString === null) {
            queryString = "";
        }
        let { data: { videos, pageData } } = await axios.get(`/videos?limit=9&`+queryString);

        debug('videos = %j', videos);

        return res.json({ videos, pageData });
    }
    catch(err) {
        return next(err);
    }
};
