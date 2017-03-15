
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:specialChannel:action.specialChannel.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let {title, MainPhoto, newsList} = req.body;
         debug('createdSpecialchannel = %j', req.body);

        newsList = _.isArray(newsList)? newsList : [newsList];

        let data = {
            title,
            MainPhoto,
            newsList,
            CreatedBy: userId
        }
        debug('SpecialchannelData = %j', data);

        let { data: specialChannel } = await axios.post('/specialchannels', data);

        debug('createdSpecialchannelData = %j', specialChannel);

        return res.redirect('/specialchannel');

    }
    catch(err) {
        return next(err);
    }
};
