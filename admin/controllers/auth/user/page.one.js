import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.one');

module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/user/page.one.js');
        });

        debug('user = %j', result);
        return res.render('auth/user/page.one.html');
    }
    catch(err) {
        return next(err);
    }
};
