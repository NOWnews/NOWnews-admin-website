import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:center:page.list');

module.exports = async (req, res, next) => {

    try {
        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/center/page.list.js');
        });

        debug('centerList = %j', result);
        return res.render('auth/center/page.list.html');
    }
    catch(err) {
        return next(err);
    }
};
