import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:page.one');

module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/role/page.one.js');
        });

        debug('role = %j', result);
        return res.render('auth/role/page.one.html');
    }
    catch(err) {
        return next(err);
    }
};
