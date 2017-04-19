import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:specialchannels:page.list');

module.exports = async (req, res, next) => {

    try{
        let userId = req.session.adminUser._id;
        let { data: specialchannel } = await axios.get(`/specialchannels`);

        let specialchannels = specialchannel;
        debug('specialChannelList = %j', specialchannels );

        return res.render('specialchannel/page.list.html', specialchannels);
    }
    catch(err) {
        return next(err);
    }
};
