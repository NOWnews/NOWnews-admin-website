import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:action.create');

module.exports = async (req, res, next) => {

    try {
        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/user/action.create.js');
        });

        debug('createdUser = %j', result);

        return res.json(result);
    }
    catch(err) {
        return next(err);
    }
};
