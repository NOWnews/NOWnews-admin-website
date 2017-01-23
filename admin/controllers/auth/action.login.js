const debug = require('debug')('NOWnewsAdmin:controllers:auth:action.login');

module.exports = async (req, res, next) => {

    try {

        let { data: loginUser } = await axios.post('/users/login', req.body);


        if (!loginUser){
            new Error('找不到 USER');
        }

        debug('login user= %j', loginUser);

        if (!req.session) {
            req.session = {};
        }

        req.session.adminUser = loginUser;

        return res.redirect('/');

    } catch(err) {
        return next(err);
    }
};
