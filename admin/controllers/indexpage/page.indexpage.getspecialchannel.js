import Debug from 'debug';
import config from 'config';
const debug = Debug('NOWnews-admin-website: controllers:page:indexpage.getnews');

module.exports = async (req, res, next) => {

    try {
        let {title}= req.query;
        let { data: {specialChannels} } = await axios.get(`/specialchannels?title=${encodeURIComponent(title)}`);

        debug('specialChannels = %j', specialChannels);
        return res.json({
            specialChannels,
        });
    }
    catch(err) {
        return next(err);
    }
};
