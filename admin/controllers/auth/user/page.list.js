import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.list');

module.exports = async (req, res, next) => {

    try {
        let userList = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/user/page.list.js');
        });

        debug('userList = %j', userList);

        userList = [{
            id: 1,
            staffId: "NN00XXX",
            status: "NEWBIE",
            email: "xx@nownews.com",
            name: "楊過",
            nickname: "過兒",
            phone: "09xx123123"
        },{
            id: 2,
            staffId: "NN00XXX",
            status: "NEWBIE",
            email: "xx@nownews.com",
            name: "小龍女",
            nickname: "姑姑",
            phone: "09xx123123"
        }];

        return res.render('auth/user/page.list.html', {
            userList,
        });
    }
    catch(err) {
        return next(err);
    }
};
