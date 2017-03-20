import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:specialchannel:page.edit');

module.exports = async (req, res, next) => {

    try {
        let baseURL = config.get('apiServer');
        let { specialchannelId } = req.params;
        let { data: specialchannel } = await axios.get(baseURL+`/specialchannels/${specialchannelId}`);

        debug('specialchannel = %j', specialchannel);

        return res.render('specialchannel/page.edit.html', {
            specialchannel
        });
    }
    catch(err) {
        return next(err);
    }
};
