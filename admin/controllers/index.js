import auth from './auth';
import home from './home';
import dashboard from './dashboard';
import news from './news';
import picture from './picture';
import video from './video';
import analysis from './analysis';
import moderator from './moderator';
import menu from './menu';

module.exports = function(app) {

    app.use('/auth', auth);
    app.use('/dashboard', dashboard);
    app.use('/news', news);
    app.use('/picture', picture);
    app.use('/video', video);
    app.use('/analysis', analysis);
    app.use('/moderator', moderator);
    app.use('/menu', menu);
    app.use('/', home);

    return function(req, res, next) {
        return next();
    };
};
