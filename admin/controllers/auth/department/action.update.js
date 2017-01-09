import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:action.update');

module.exports = async (req, res, next) => {

    try {
        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/department/action.update.js');
        });

        debug('updatedDepartment = %j', result);

        return res.json(result);
    }
    catch(err) {
        return next(err);
    }
};
