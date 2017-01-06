import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.list');

module.exports = async (req, res, next) => {

    try {
        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/user/page.list.js');
        });

        debug('userList = %j', result);
        return res.render('auth/user/page.list.html');
    }
    catch(err) {
        return next(err);
    }
};
