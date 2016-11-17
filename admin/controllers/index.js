import home from './home';
import login from './login';


module.exports = function(app) {

    app.use('/', home);
    app.use('/', login);

    return function(req, res, next) {
        return next();
    };
};
