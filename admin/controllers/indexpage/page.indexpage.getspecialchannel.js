import Debug from 'debug';
import config from 'config';
const debug = Debug('NOWnews-admin-website: controllers:page:indexpage.getnews');

module.exports = async (req, res, next) => {

    try {
        let baseURL = config.get('apiServer');
        let {title}= req.query;
        let { data: {specialChannels} } = await axios.get(baseURL+`/specialchannels?title=${title}`);

        debug('specialChannels = %j', specialChannels);
        return res.json({
            specialChannels,
        });
    }
    catch(err) {
        return next(err);
    }
};
