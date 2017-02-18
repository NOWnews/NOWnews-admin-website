import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:map:action.find.location');

module.exports = async (req, res, next) => {

    try {

        let data = req.query;
        // let data = req.body;

        let { data: location } = await axios.get( `/map/location`, {
            params: data
        });

        debug('location = %j', location);

        return res.json({ location });

    }
    catch(err) {
        return next(err);
    }
};
