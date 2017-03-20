import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:specialchannel:action.update');

module.exports = async (req, res, next) => {

    try {
        let baseURL = config.get('apiServer');
        let { specialchannelId } = req.params;
        let userId = req.session.adminUser._id;
        let {title, MainPhoto, newsList} = req.body;
        debug('req.body = %j', req.body);
        newsList = _.isArray(newsList)? newsList : [newsList];

        let data = {
            title,
            MainPhoto,
            newsList,
            UpdatedBy: userId
        }

        let { data: specialchannel } = await axios.put(baseURL+`/specialchannels/${specialchannelId}`, data);

        debug('updatedSpecialchannel = %j', specialchannel);

        return res.redirect(`/specialchannel/${specialchannelId}`);
    }
    catch(err) {
        return next(err);
    }
};
