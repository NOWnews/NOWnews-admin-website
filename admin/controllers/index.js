import auth from './auth';
import home from './home';

module.exports = function(app) {

    app.use('/', auth);
    app.use('/', home);

    return function(req, res, next) {
        return next();
    };
};
