import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:app:action.versionCreate');

module.exports = async (req, res, next) => {
    try{

        let userId = req.session.adminUser._id;
        let { appVersion, osType, device, downloadLink } = req.body;
        debug('req.body = %j', req.body);

        let options = {
            version: appVersion,
            os: osType,
            device,
            downloadLink,
            CreatedBy: userId
        };

        let { data: newAppInfo } = await axios.post('/app/version', options);
        debug('new app info = %j', newAppInfo);

        return res.redirect('/app/version');
    }
    catch(err) {
        return next(err);
    }
};