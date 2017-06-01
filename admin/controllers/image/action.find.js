import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:action.find');

module.exports = async (req, res, next) => {

    try {

        let queryString = req._parsedUrl.query;

        if (queryString === null) {
            queryString = "";
        }

        let { data } = await axios.get(`/images?limit=12&${queryString}`);

        debug('images = %j', data);

        return res.json(data);
    }
    catch(err) {
        return next(err);
    }
};
