import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:page.list');

module.exports = async (req, res, next) => {

    try {
        let roleList = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/role/page.list.js');
        });

        roleList = [{
            id: 1,
            name: '總編輯',
        },{
            id: 2,
            name: '副總編輯',
        }];
        debug('roleList = %j', roleList);
        return res.render('auth/role/page.list.html', {
            roleList,
        });
    }
    catch(err) {
        return next(err);
    }
};
