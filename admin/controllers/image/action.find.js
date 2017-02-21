import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:action.find');

module.exports = async (req, res, next) => {

    try {

        let queryString = req._parsedUrl.query;

        if (queryString === null) {
            queryString = "";
        }

        let { data: { images } } = await axios.get(`/images?limit=24&${queryString}`);

        debug('images = %j', images);

        return res.json({
            images,
        });
    }
    catch(err) {
        return next(err);
    }
};
