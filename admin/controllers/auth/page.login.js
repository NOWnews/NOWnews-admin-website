const debug = require('debug')('NOWnewsAdmin:controllers:auth:page.login');

module.exports = function(req, res, next) {
    return res.render('login');
};
