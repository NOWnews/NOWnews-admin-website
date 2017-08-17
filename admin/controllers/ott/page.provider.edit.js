import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:provider:page.edit');

module.exports = async (req, res, next) => {

    try {

        let { providerId } = req.params;
        let { data: platform } = await axios.get(`/ott/providers/${ providerId}`);

        debug('platform = %j', platform);
        return res.render('ott/page.providers.edit.html', {
            platform
        });
    } catch(err) {
        return next(err);
    }
};
