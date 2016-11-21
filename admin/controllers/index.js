import auth from './auth';
import home from './home';
import dashboard from './dashboard';

module.exports = function(app) {

    app.use('/', auth);
    app.use('/', home);
    app.use('/', dashboard);

    return function(req, res, next) {
        return next();
    };
};
