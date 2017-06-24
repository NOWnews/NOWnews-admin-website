import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:app:page.splash');

import Promise from 'bluebird';

module.exports = async (req, res, next) => {
    try{

        let [ { data: phoneSplash }, { data: tabletSplash }, { data: boxSplash } ] = await Promise.all([
            axios.get(`/app/splash?device=PHONE`),
            axios.get(`/app/splash?device=TABLET`),
            axios.get(`/app/splash?device=BOX`)
        ]);
        debug('phone slash = %j', phoneSplash);
        debug('tablet slash = %j', tabletSplash);
        debug('box slash = %j', boxSplash);

        return res.render('app/page.splash.html', {
            phoneSplash,
            tabletSplash,
            boxSplash
        });
    }
    catch(err) {
        return next(err);
    }
};