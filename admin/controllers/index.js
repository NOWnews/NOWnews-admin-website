import adminMenu from '../../adminMenu.json';
import home from './home';
import image from './image';
import robot from './robot';
import _ from 'lodash';

let adminPageRouter = {
    analysis: require('./analysis'),
    auth: require('./auth'),
    dashboard: require('./dashboard'),
    layout: require('./layout'),
    menu: require('./menu'),
    tags: require('./tags'),
    moderator: require('./moderator'),
    news: require('./news'),
    picture: require('./picture'),
    video: require('./video'),
};

module.exports = function(app) {
    _.forEach(adminMenu, (menuValue, key) => {
        app.use(`/${key}`, adminPageRouter[key]);
    });

    app.use('/robots.txt', robot);
    app.use('/image', image);
    app.use('/', home);

    return function(req, res, next) {
        return next();
    };
};
