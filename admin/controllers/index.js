import auth from './auth';
import home from './home';
import robot from './robot';
import _ from 'lodash';

let adminPageRouter = {
    analysis: require('./analysis'),
    dashboard: require('./dashboard'),
    menu: require('./menu'),
    moderator: require('./moderator'),
    news: require('./news'),
    picture: require('./picture'),
    video: require('./video'),
    layout: require('./layout'),
    member: require('./member'),
}

import adminMenu from '../../adminMenu.json';

module.exports = function(app) {
    _.forEach(adminMenu, (menuValue, key) => {
        app.use(menuValue.url, adminPageRouter[key]);
    });

    app.use('/auth', auth);
    app.use('/robots.txt', robot);
    app.use('/', home);

    return function(req, res, next) {
        return next();
    };
};
