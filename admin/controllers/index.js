import home from './home';
import login from './login';
import dashboard from './dashboard';


module.exports = function(app) {

    app.use('/', home);
    app.use('/', login);
    app.use('/', dashboard);

    return function(req, res, next) {
        return next();
    };
};
