import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:page.list');

module.exports = async (req, res, next) => {

    try {
        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/role/page.list.js');
        });

        debug('roleList = %j', result);
        return res.render('auth/role/page.list.html');
    }
    catch(err) {
        return next(err);
    }
};
