import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:center:page.one');

module.exports = async (req, res, next) => {

    try {

        let center = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/center/page.one.js');
        });

        center = {
            id: 1,
            name: '研發中心',
            Departments: [{
                id: 1,
                name: '系統開發部',
            } , {
                id: 2,
                name: '視覺設計部',
            }],
        };

        debug('center = %j', center);
        return res.render('auth/center/page.one.html', {
            center,
        });
    }
    catch(err) {
        return next(err);
    }
};
