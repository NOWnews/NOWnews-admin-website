import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:center:page.list');

module.exports = async (req, res, next) => {

    try {
        let centerList = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/center/page.list.js');
        });

        // fakeData
        centerList = [{
            id: 1,
            name: '研發中心',
            Departments: [{
                id: 1,
                name: '系統開發部',
            } , {
                id: 2,
                name: '視覺設計部',
            }],
        },{
            id: 2,
            name: '新聞中心',
            Departments: [{
                id: 3,
                name: '生活組',
            } , {
                id: 4,
                name: '編輯組',
            }],
        }];

        debug('centerList = %j', centerList);
        return res.render('auth/center/page.list.html', {
            centerList,
        });

    } catch(err) {
        return next(err);
    }
};
