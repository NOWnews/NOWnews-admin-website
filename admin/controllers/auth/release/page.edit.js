import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:page.edit');

module.exports = async (req, res, next) => {

    try {
        let { data: releaseRules } = await axios.get(`/releaseRules`);

        debug('releaseRules = %j', releaseRules);

        return res.render('auth/release/page.edit.html', {
            releaseRules
        });

    } catch (err) {
        return next(err);
    }
};
