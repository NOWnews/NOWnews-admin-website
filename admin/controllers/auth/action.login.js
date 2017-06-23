import moment from 'moment-timezone';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:action.login');

module.exports = async (req, res, next) => {

    try {

        let { remember } = req.body;
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
            Department,
            Center,
            Role,
            ...adminUser
        } = loginUser;

        adminUser.avatarUrl = Avatar ? Avatar.url : null ;

        // adminUser.Department = {
        //     _id: Department._id,
        //     name: Department.name,
        // };
        adminUser.Department = null;
        if(Department) {
            adminUser.Department = {
                _id: Department._id,
                name: Department.name,
            };
        }

        // adminUser.Center = {
        //     _id: Center._id,
        //     name: Center.name,
        // };
        adminUser.Center = null;
        if(Center) {
            adminUser.Center = {
                _id: Center._id,
                name: Center.name,
            };
        }

        adminUser.Role = {
            _id: Role._id,
            name: Role.name,
        };

        adminUser.loginedTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm');

        debug('login user= %j', adminUser);

        req.session.adminUser = adminUser;

        if (remember) {
            res.cookie('_now_admin', adminUser.email, { httpOnly: true });
        } else {
            res.clearCookie('_now_admin');
        }

        return res.redirect('/');

    } catch(err) {
        return next(err);
    }
};
