import co from 'co';
// import Promise from 'bluebird';
// const models = require('../../../models');
// const libs = require('../../../libs');

const debug = require('debug')('NOWnewsAdmin:controllers:auth:action.login');

module.exports = function(req, res, next) {

    let data = req.body;

    co(function*() {

        // let loginUser = yield models.adminUser.findOne()
        //     .where('email').equals(data.email)
        //     .where('password').equals(libs.hashPwd(data.password))
        //     .execAsync();

        // if(!loginUser){
        //     return Promise.reject(new Error('找不到 USER'));
        // }

        // debug('login user= %j', loginUser);

        let loginUser = {
            _id: '530000000000000000000001',
            name: 'admin',
        };


        if (!req.session) {
            req.session = {};
        }

        req.session.adminUser = loginUser;

        return res.redirect('/');
    })
    .catch(next);
};
