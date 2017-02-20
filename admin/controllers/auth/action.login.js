import moment from 'moment-timezone';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:action.login');

module.exports = async (req, res, next) => {

    try {

        let { data: loginUser } = await axios.post('/users/login', req.body);

        if (!loginUser){
            new Error('找不到 USER');
        }

        if (!req.session) {
            req.session = {};
        }

        // 處理不將沒必要的欄位存在
        let {
            Avatar,
            createdAt,
            CreatedBy,
            updatedAt,
            UpdatedBy,
            Center,
            Department,
            Role,
            ...adminUser
        } = loginUser;

        adminUser.avatarUrl = Avatar ? Avatar.url : null ;

        // adminUser.Center = {
        //     _id: Center._id,
        //     name: Center.name,
        // };
        if(Center) {
            adminUser.Center = {
                _id: Center._id,
                name: Center.name,
            };
        }

        // adminUser.Department = {
        //     _id: Department._id,
        //     name: Department.name,
        // };
        if(Department) {
            adminUser.Department = {
                _id: Department._id,
                name: Department.name,
            };
        }

        adminUser.Role = {
            _id: Role._id,
            name: Role.name,
        };

        adminUser.loginedTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm');

        debug('login user= %j', adminUser);

        req.session.adminUser = adminUser;

        return res.redirect('/');

    } catch(err) {
        return next(err);
    }
};
