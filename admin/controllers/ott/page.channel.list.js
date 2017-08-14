import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:page.list');

module.exports = async (req, res, next) => {

    try{
        let { providerId } = req.query;
        let userId = req.session.adminUser._id;

        let { data: allChannel } = await axios.get('/ott/providers');

        let providerOne;
        if (allChannel.length > 0) {
            providerId = allChannel[0]._id;
        }
        if(providerId) {
            let { data:providerOne } = await axios.get(`ott/providers/${providerId}`);
            console.log(123)
            return res.render('ott/page.allchannel.list.html', {
                allChannel,
                providerOne,
                providerId
            });
        }else{
            return res.render('ott/page.allchannel.list.html', {
                allChannel,
                providerOne,
                providerId
            });
        }
        // if (providerId) {


        // } else {

        //     providerId = allChannel[0]._id;
        //     let { data:providerOne } = await axios.get(`ott/providers/${providerId}`);
        //         console.log(providerId);
        //         return res.render('ott/page.allchannel.list.html', {
        //             providerOne,
        //             allChannel,
        //             providerId
        //         })
        // }
        debug('allChannelList = %j', allChannel );


    }
    catch(err) {
        return next(err);
    }
};
