import Debug from 'debug';
import { USER_STATUS } from '../../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:page.list');

module.exports = async (req, res, next) => {

    try {

        // let { data: userList } = await axios.get('/users');

        let userList = [{
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

        debug('userList = %j', userList);

        return res.render('auth/user/page.list.html', {
            USER_STATUS,
            userList,
        });
    } catch(err) {
        return next(err);
    }
};
