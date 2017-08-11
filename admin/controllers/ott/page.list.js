import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:page.list');

module.exports = async (req, res, next) => {

    try{
        let userId = req.session.adminUser._id;
        let { data: platform } = await axios.get('/ott/providers');

        debug('platformList = %j', platform );
        return res.render('ott/page.list.html', {
            platform
        });
    }
    catch(err) {
        return next(err);
    }
};
