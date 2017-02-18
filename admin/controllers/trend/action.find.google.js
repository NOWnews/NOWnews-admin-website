import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:trend:action.find.google');

module.exports = async (req, res, next) => {

    try {

        let { data: google } = await axios.get( `/trend/googleKeywords` );

        debug('googleKeywords = %j', google);

        return res.json({ google });

    }
    catch(err) {
        return next(err);
    }
};
