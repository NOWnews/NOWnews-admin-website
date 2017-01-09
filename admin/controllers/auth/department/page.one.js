import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:page.one');

module.exports = async (req, res, next) => {

    try {

        let department = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/department/page.one.js');
        });
        department = {
            id: 1,
            center: {
                id: 2,
            },
            name: "政治組",
        };
        debug('department = %j', department);
        return res.render('auth/department/page.one.html', {
            department,
        });
    }
    catch(err) {
        return next(err);
    }
};
