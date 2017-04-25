import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:specialchannel:page.edit');

module.exports = async (req, res, next) => {

    try {
        let { specialchannelId } = req.params;
        let { data: specialchannel } = await axios.get(`/specialchannels/${specialchannelId}`);

        debug('specialchannel = %j', specialchannel);

        return res.render('specialchannel/page.edit.html', {
            specialchannel
        });
    }
    catch(err) {
        return next(err);
    }
};
