import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:app:page.versionlist');

module.exports = async (req, res, next) => {
    try{
        let { data: appInfoList } = await axios.get(`/app/version`);
        debug('app info list = %j', appInfoList);

        return res.render('app/page.list.html', {
            appInfoList
        });
    }
    catch(err) {
        return next(err);
    }
};