import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:page.one');

module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/department/page.one.js');
        });

        debug('department = %j', result);
        return res.render('auth/department/page.one.html');
    }
    catch(err) {
        return next(err);
    }
};
