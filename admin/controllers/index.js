import analysis from './analysis';
import auth from './auth';
import dashboard from './dashboard';
import home from './home';
import menu from './menu';
import moderator from './moderator';
import news from './news';
import picture from './picture';
import robot from './robot';
import video from './video';


module.exports = function(app) {

    app.use('/analysis', analysis);
    app.use('/auth', auth);
    app.use('/dashboard', dashboard);
    app.use('/menu', menu);
    app.use('/moderator', moderator);
    app.use('/news', news);
    app.use('/picture', picture);
    app.use('/robots.txt', robot);
    app.use('/video', video);
    app.use('/', home);

    return function(req, res, next) {
        return next();
    };
};
