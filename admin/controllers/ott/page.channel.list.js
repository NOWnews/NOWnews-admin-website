import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:page.list');

module.exports = async (req, res, next) => {

    try{
        let { providerId } = req.query;
        let userId = req.session.adminUser._id;

        let { data: allChannel } = await axios.get('/ott/providers');


        if (providerId) {
        let { data:providerOne } = await axios.get(`ott/providers/${providerId}`);
            return res.render('ott/page.allchannel.list.html', {
                allChannel,
                providerOne,
                providerId
            });
        } else {
            return res.render('ott/page.allchannel.list.html', {
                allChannel,
                providerId
            })
        }
        debug('allChannelList = %j', allChannel );


    }
    catch(err) {
        return next(err);
    }
};
