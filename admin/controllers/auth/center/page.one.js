import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:center:page.one');

module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/center/page.one.js');
        });

        debug('center = %j', result);
        return res.render('auth/center/page.one.html');
    }
    catch(err) {
        return next(err);
    }
};
