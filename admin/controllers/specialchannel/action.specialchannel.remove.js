import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:Speicalchannel:action.remove');

module.exports = async (req, res, next) => {

    try {
        let baseURL = config.get('apiServer');
        let { specialchannelId } = req.params;
        let userId = req.session.adminUser._id;
        let data = req.body;
        data.UpdatedBy = userId;
        let { data: speicalchannel } = await axios({method: 'delete', url: `${baseURL}/specialchannels/${specialchannelId}`, data});
        debug('removedSpeicalchannel = %j', speicalchannel);
        return res.json({ speicalchannel });
    }
    catch(err) {
        return next(err);
    }
};
